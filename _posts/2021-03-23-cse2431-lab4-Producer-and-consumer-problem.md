---
layout: post
title: 'OS Lab 4: Producer and Consumer Problem in Multi-threaded Programming'
date: '2021-03-23'
categories: ["Operating System"]
tags:
    - "Multi-threaded Programming"
excerpt: >-
  In operating systems, certain synchronization problems are well known, and are considered to present the synchronization issues which must be solved effectively in any system for correct operation. One of these is the bounded buffer problem. 

---

## Table of contents
{: .no_toc .text-delta }

1. TOC
{: toc }




## Problem Statement: 
* **Background:**
In operating systems, certain synchronization problems are well known, and are considered to present the synchronization issues which must be solved effectively in any system for correct operation. One of these is the bounded buffer problem. 
* **The Bounded Buffer Problem** 
In this problem, two different types of processes or threads produce and consume items from a bounded buffer, which is often implemented as an array. The bounded buffer has a fixed size (thus, bounded), but it is used as a circular queue. In this lab, the buffer has size 5, and the discussion below also uses a
buffer of size 5. 
* **Producer:**
Producers “produce” items (in our case, integers), and insert them into the buffer. “Producing” an item sometimes means producing data, or sometimes means doing some work on data. In the case of this lab, the producers simply call rand_r() to generate a pseudo-random integer, and then put the integer generated into the buffer. The producers start inserting items, one by one as they are produced, at the beginning of the buffer (array index 0), and proceed producing and inserting items in order, from index 0 to index n – 1 (for a buffer of size n), until they reach the end of the buffer. Once the producers have put an item into the end of the buffer, they return to the beginning of the buffer (index 0) to insert the next item produced. All of the producer threads share an index for the buffer, so that whenever a producer inserts an item into the buffer, the next producer to insert will insert into the next spot in the buffer, because the index in incremented every time a spot is filled in the buffer. Notice that, since the seed value for rand_r() is set to a certain value in the code provided to you, the same sequence of pseudo-random integers will be generated each time the code is executed. This is intentional. 
* **Consumer:**
In a similar way, consumers “consume” the items inserted by the producers. Here, “consuming” simply means reading; the consumers do not change items in the buffer. In other cases, consuming is actually doing some work on an item. When an item is consumed, it remains in the buffer until it is overwritten by another producer placing an item in the same position in the buffer, if the producer inserts another item there later. The consumers start consuming items, one by one, at the beginning of the buffer (array index 0), and proceed consuming items in order, from index 0 to index n – 1 (for a buffer of size n), until they reach the end of the buffer. Once the consumers have consumed an item at the end of the buffer, they return to the beginning of the buffer (index 0) to consume the next item produced. All of the consumer threads share an index for the buffer, so that whenever a consumer consumes an item from the buffer, the next consumer to consume will consume an item from the next spot in the buffer, because the index in incremented every time an item is consumed from the buffer. 

Notice that the order in which items are produced and consumed is critical. We will use a function in the C library, rand_r(), which produces pseudo-random integers, in order to provide items to the producers to insert into the buffer (rand_r() is re-entrant, which means it is thread safe). rand_r() takes a seed value, and the values of the items produced depend on the seed value; thus, for a particular seed value, the same pseudo-random sequence will always be produced. If your solution is correct, the buffer items produced and consumed should be the same, and in the same order. If the items are different, or in a different relative order, the solution is not correct, and points will be deducted from your score (usually, a significant number of points). The time at which producers and consumers output items cannot be predicted, but the order in which the producers output items, and the order in which consumers output the items, must be the same. Also, no item should be consumed before it is produced. 

## Terminology:
* **Thread-safe**: means that the program protects shared data, possibly through the use of mutual exclusion.
* **Cirtical section**: In short, the code must be executed in sequential order, protected from multiple access at a same time. In other words, a critical section is a piece of code that accesses a shared variable (or more generally, a shared resource) and must not be concurrently executed by more than one thread. -- Textbook p306
* **Mutual Exclusion**: This property guarantees that if one thread is executing within the critical section, the others will be prevented from doing so. -- Textbook p306
* **Atomic operation**: In short, it means "all or nothing"; it should either perform all the actions/operations, or that none of them should occur, so no in-between state.

## Methods:
* Approach 1: Use lock and condition variable
    * bounded_buffer.h: This .h file serves as a contract between you and other developers.

{% highlight C linenos %}
#ifndef _BOUNDED_BUFFER_H 
#define _BOUNDED_BUFFER_H 
#include <pthread.h>

/* do not use any global variables in this file */
struct bounded_buffer{
    /* define all necessary variables here */
    int BUFFER_SIZE;
    int item_count;
    // Define the mutex lock for consumer and producer
    pthread_mutex_t mutex;
    pthread_cond_t cond;
    // Define the buffer array, and the index of item for producer and consumer
    int prod_idx, consum_idx;
    int *circular_buffer;
};

/* do not change the following function definitions */

/* Initialize a buffer; size is the max number of items in the buffer*/
void bounded_buffer_init(struct bounded_buffer *buffer, int size);

/** Add item to the tail of the buffer. If the buffer is full, wait till the buffer is not full. This function should be thread-safe. */
void bounded_buffer_push(struct bounded_buffer *buffer, void *item);

/** Remove an item from the head of the buffer. If the buffer is empty, wait till the buffer is not empty. Return the removed item. This function should be thread-safe. */
void* bounded_buffer_pop(struct bounded_buffer *buffer);

/* Release the buffer */
void bounded_buffer_destroy(struct bounded_buffer *buffer);

#endif
{% endhighlight %}

* Why we need `#ifndef-#define-#endif`? ==>  If this .h file is not defined, we will define it for the first time. It helps to prevent the conflicted definition when you included the same .h file multiple times, which can cause error. So, it's always a good habit to do this for each .h file that you defined.

* bounded_buffer.c: This file implemented all the abstract functions declared in the bounded_buffer.h file. 

{% highlight C linenos %}
#include "bounded_buffer.h"
#include <stdio.h>
#include <stdlib.h>

/*Do not use any global variables for implementation*/
void bounded_buffer_init(struct bounded_buffer *buffer, int size){
    /* Intialize the mutex and cond */
    pthread_mutex_init(&buffer->mutex, NULL);
    pthread_cond_init(&buffer->cond, NULL);
    
    // Initialize the buffer
    buffer->BUFFER_SIZE = size;
    buffer->circular_buffer = (int *)malloc(sizeof(int)*size);
    /* initialize all buffer_items to 0 */
    int i;
    for (i = 0; i < size; ++i) {
        buffer->circular_buffer[i] = 0;
        // printf("buffer->circular_buffer[%d] = %d\n", i, buffer->circular_buffer[i]);
    }
}

void bounded_buffer_push(struct bounded_buffer *buffer, void *item_ptr){
    int item = *(int *)item_ptr;

    if(buffer->item_count >= buffer->BUFFER_SIZE){
        printf("Error: buffer full! buffer->item_count=%d, and the maximum buffer size is %d\n", buffer->item_count, buffer->BUFFER_SIZE);
    }else{
        // Increment the counter
        buffer->item_count+=1;
        // Push the item into buffer and update the prod_idx
        buffer->circular_buffer[buffer->prod_idx] = item;
        printf("Produced produced :%d at %d\n", item, buffer->prod_idx);
        buffer->prod_idx=(buffer->prod_idx + 1) % buffer->BUFFER_SIZE;
    }

}

void* bounded_buffer_pop(struct bounded_buffer *buffer){
    int *item_ptr = NULL;
    
    if(buffer->item_count <= 0){
        printf("Error: buffer empty! current buffer->item_count=%d\n", buffer->item_count);
    }else{
        item_ptr = (int *)malloc(sizeof(int));
        // Decrement the counter
        buffer->item_count-=1;
        // Pop the item from buffer and update the consum_idx
        *item_ptr = buffer->circular_buffer[buffer->consum_idx];
        printf("\tConsumer consumed :%d at %d\n", *item_ptr, buffer->consum_idx);
        buffer->consum_idx = (buffer->consum_idx+1) % buffer->BUFFER_SIZE;
    }
    
    return item_ptr;
}

void bounded_buffer_destroy(struct bounded_buffer *buffer){
    // Destroy the mutex and cond
    pthread_mutex_destroy(&buffer->mutex);
    pthread_cond_destroy(&buffer->cond);

    /* Reset all buffer_items to 0 */
    int i;
    free(buffer->circular_buffer);
}
{% endhighlight %}

* How do we know when all threads have finished their jobs? ==> You don't, so you cannot simply use `pthread_join` because your might have producer thread that might never return. But, if you don't call `pthread_join`, main thread will terminate quickly and then all threads will be terminated/killed. Instead, in lab4, you can simply use `sleep(# sec)` to wait the thread to finish. ==> This might not a good solution, but we will learn a better solution in lab5.
  
* main.c (producer() and consumer()):

{% highlight C linenos %}
#include "bounded_buffer.h"
#include <stdio.h>
#include <stdlib.h>

#include <unistd.h>
#include <pthread.h>
#include <semaphore.h> // If you need to use semaphores, you also need to add –lrt to the gcc command in Makefile.

struct bounded_buffer queue;

void *producer(void *ptr);
void *consumer(void *ptr);

int main() {
    // Set the seed random generator
    srand(100);
    /* initialize the queue */
    // In your final submission, you should create 3 producers and 2 consumers in main.c. You should let each producer generate 10 different messages and you should set the size of the bounded buffer to be 5.
    int size = 5;
    bounded_buffer_init(&queue, size);

    /* Create the thread ID and the threads */
    int num_producer = 1;
    int num_consumer = 5;
    pthread_t p_prod[num_producer];
    pthread_t p_consum[num_consumer];
    
    /* Initialize the number of items that producer want to produce and consumer want to consume*/
    int prod_num[num_producer];
    int consum_num[num_consumer];
    int i,j;
    for(i=0;i<num_producer;i++){
        prod_num[i]=10;
    }
    for(j=0;j<num_consumer;j++){
        consum_num[j]=10;
    }
    
    /* Create producer thread */
    for(i=0; i<num_producer; i++){
        printf("==> Producer %d created!\n", i);
        pthread_create(&p_prod[i], NULL, producer, &prod_num[i]);
    }
    
    /* Create consumer thread */
    for(j=0; j<num_consumer; j++){
        printf("==> Consumer %d created!\n", j);
        pthread_create(&p_consum[j], NULL, consumer, &consum_num[j]);
    }
    
    /* Sleep for a while, waiting for all the thread finish their jobs */
    sleep(3);
    
    /* Wait all the child thread to finish ==> Don’t call pthread_join, because some thread might never finish, e.g., we might have extra producer want to produce items when the buffer is full.*/
    // for (i = 0; i < num_producer; i++) {
    //     pthread_join(p_prod[i], NULL); 
    // }
    // for (j = 0; j < num_consumer; j++) {
    //     pthread_join(p_consum[j], NULL); 
    // }
    
    /* Destroy all the shared objects that need to be removed */
    bounded_buffer_destroy(&queue);
    
    return 0;
}

/* this is the function executed by the producer thread. 
   It should generate a number of messages and push them into the queue */
void *producer(void *ptr){
    int prod_num = *(int *)ptr;
    int item;
    int i;
    for(i=0; i<prod_num; i++){
        pthread_mutex_lock(&queue.mutex);

        while(queue.item_count==queue.BUFFER_SIZE){
            pthread_cond_wait(&queue.cond, &queue.mutex);
        }
        /* generate a random number between 0 and 100 */
        item = rand() % 100;
        /* insert item into buffer */
        bounded_buffer_push(&queue, &item);
        // Broadcast(awake arbitrary sleeping threads if there's one) all sleeping consumer to consume item and unlock the conditional variable
        pthread_cond_broadcast(&queue.cond);
        pthread_mutex_unlock(&queue.mutex);
    }
}

/* this is the function executed by the consumer thread. 
   It should pop messages from the queue and print them */
void *consumer(void *ptr){
    int consum_num = *(int *)ptr;
    int *item_ptr;
    int i;
    for(i=consum_num; i>0; i--){
        pthread_mutex_lock(&queue.mutex);
        while(queue.item_count==0){
            pthread_cond_wait(&queue.cond, &queue.mutex);
        }
        /* Get an item from the buffer */
        item_ptr = (int *)bounded_buffer_pop(&queue);
        // printf("Consumer consumed: %d\n", *item_ptr);
        if(item_ptr!=NULL){
            free(item_ptr);
        }
        // Broadcast all sleeping producer to produce item and unlock the conditional variable
        pthread_cond_broadcast(&queue.cond);
        pthread_mutex_unlock(&queue.mutex);
    }
}
{% endhighlight %}

* Why I prefer to use "broadcast" instead of "signal"? 
  ==> Comparing to "signal", "broadcast" is always correct, although it may be inefficient (If that's really the case, the bottleneck for the performance, then it would be the time to consider to use "signal"). ==> Consider the case of seller-buyer problem. We have a seller want to sell 3 tickets, and two buyers, one want to buy 2 tickets, and another one want to buy 5 tickets. In good result, the buyer who want to buyer 2 ticket should win. Because, we don't have enough tickets for the buyer with 5 ticket, and he need to wait. However, if we use signal here. It will just wakeup one thread, and we don't know which one will be wakeup. If the buyer with 5 ticket got wakeup, then the thread/buyer with 2 ticket will never get the tickets.
* Why we should always use "while" instead of "if" for checking the conditional statement? 
    - 1): **Spurious wakeup**: Spurious wakeup is a very famous Linux OS problem. It means sometime a sleeping thread can wakeup without anyone calling signal/broadcast. It is rare, but can happen. 
    - 2): When checking for a condition in a multi-threaded program, using a while loop is always correct; using an if statement only might be, depending on the semantics of signaling. 



## Test case:
* Base case: 
  - It should work for that case of 1 producer and 0 consumer threads; or 0 producer and 1 consumer threads;
* Regular case: 
    - Try 3 producers and 2 consumer in main.c, and each producer should generate 10 different messages, and you should set the size of the bounded buffer to be 5. 
    - Try different size of bounded buffer, including 1.


---
### Reference:
- Wikipedia, Circular buffer: <https://www.wikiwand.com/en/Circular_buffer>
- Wikipedia, Producer–consumer problem: <https://www.wikiwand.com/en/Producer%E2%80%93consumer_problem>
- CS140: Locks and Condition Variables: <https://web.stanford.edu/~ouster/cgi-bin/cs140-spring14/lecture.php?topic=locks>
- Multithreaded Programming (POSIX pthreads Tutorial): <https://randu.org/tutorials/threads/#tsp>
- LLNL POSIX Threads Programming: <https://hpc-tutorials.llnl.gov/posix/>

### Q&A





