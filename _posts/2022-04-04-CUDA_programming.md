---
layout: post  # Required
title: 'HPC Lab: CUDA C Programming with SOR' # Required
date: 2022-04-04    # Required
categories: [CUDA] # Option
tags: []  # Option
permalink: 2022-04-04-CUDA_programming
toc: true   # Option
excerpt: >-
    **Purpose of this lab**
    a.   HW – Understanding GPU basics: accelerators, accelerator memory, SIMT support.
    b.   SW – Understanding SIMT model, basic CUDA programming model.   
    c.   Programming – Set up and test a GPU environment. Write and test a simple GPU program, involving process of CUDA memory allocation, data transfer from Host to Device, launch GPU kernel functin, etc.
---



## Table of contents

{: .no_toc .text-delta }

1. TOC
{: toc }



<details><summary><b>CLICK ME</b> - Yolo v2 models</summary>
- `yolov2.cfg` (194 MB COCO Yolo v2) - requires 4 GB GPU-RAM: https://pjreddie.com/media/files/yolov2.weights
- `yolo-voc.cfg` (194 MB VOC Yolo v2) - requires 4 GB GPU-RAM: http://pjreddie.com/media/files/yolo-voc.weights
- `yolov2-tiny.cfg` (43 MB COCO Yolo v2) - requires 1 GB GPU-RAM: https://pjreddie.com/media/files/yolov2-tiny.weights
- `yolov2-tiny-voc.cfg` (60 MB VOC Yolo v2) - requires 1 GB GPU-RAM: http://pjreddie.com/media/files/yolov2-tiny-voc.weights
- `yolo9000.cfg` (186 MB Yolo9000-model) - requires 4 GB GPU-RAM: http://pjreddie.com/media/files/yolo9000.weights
</details>
<details><summary><b>CLICK ME</b> - Yolo v3 models</summary>
- [csresnext50-panet-spp-original-optimal.cfg](https://raw.githubusercontent.com/AlexeyAB/darknet/master/cfg/csresnext50-panet-spp-original-optimal.cfg) - **65.4% mAP@0.5 (43.2% AP@0.5:0.95) - 32(R) FPS** - 100.5 BFlops - 217 MB: [csresnext50-panet-spp-original-optimal_final.weights](https://drive.google.com/open?id=1_NnfVgj0EDtb_WLNoXV8Mo7WKgwdYZCc)
- [yolov3-spp.cfg](https://raw.githubusercontent.com/AlexeyAB/darknet/master/cfg/yolov3-spp.cfg) - **60.6% mAP@0.5 - 38(R) FPS** - 141.5 BFlops - 240 MB: [yolov3-spp.weights](https://pjreddie.com/media/files/yolov3-spp.weights)
- [csresnext50-panet-spp.cfg](https://raw.githubusercontent.com/AlexeyAB/darknet/master/cfg/csresnext50-panet-spp.cfg) - **60.0% mAP@0.5 - 44 FPS** - 71.3 BFlops - 217 MB: [csresnext50-panet-spp_final.weights](https://drive.google.com/file/d/1aNXdM8qVy11nqTcd2oaVB3mf7ckr258-/view?usp=sharing)
- [yolov3.cfg](https://raw.githubusercontent.com/AlexeyAB/darknet/master/cfg/yolov3.cfg) - **55.3% mAP@0.5 - 66(R) FPS** - 65.9 BFlops - 236 MB: [yolov3.weights](https://pjreddie.com/media/files/yolov3.weights)
- [yolov3-tiny.cfg](https://raw.githubusercontent.com/AlexeyAB/darknet/master/cfg/yolov3-tiny.cfg) - **33.1% mAP@0.5 - 345(R) FPS** - 5.6 BFlops - 33.7 MB: [yolov3-tiny.weights](https://pjreddie.com/media/files/yolov3-tiny.weights)
- [yolov3-tiny-prn.cfg](https://raw.githubusercontent.com/AlexeyAB/darknet/master/cfg/yolov3-tiny-prn.cfg) - **33.1% mAP@0.5 - 370(R) FPS** - 3.5 BFlops - 18.8 MB: [yolov3-tiny-prn.weights](https://drive.google.com/file/d/18yYZWyKbo4XSDVyztmsEcF9B_6bxrhUY/view?usp=sharing)
</details>


**Reference:**

- [An Intro to Threading in Python](https://realpython.com/intro-to-python-threading/#starting-a-thread), https://realpython.com/intro-to-python-threading/#starting-a-thread
- [Speed Up Your Python Program With Concurrency](https://realpython.com/python-concurrency/)
- [Python library -- threading](https://docs.python.org/3/library/threading.html),  https://docs.python.org/3/library/threading.html


## Part 1:

Read cuda_test.cu and make sure you understand it. Compile and run the program.

```c
/*
   Minimal CUDA program, intended just to test ability
   to compile and run a CUDA program

     nvcc cuda_test_lab7.cu -o cuda_test_lab7

   You need to follow instructions provided elsewhere, such as in the
   "CUDA_and-SCC-for-EC527,pdf" file, to setup your environment where you can
   compile and run this.

   To understand the program, of course you should read the lecture notes
   (slides) that have "GPU" in the name.
*/

#include <cstdio>
#include <cstdlib>
#include <math.h>

// Assertion to check for errors
#define CUDA_SAFE_CALL(ans) { gpuAssert((ans), (char *)__FILE__, __LINE__); }
inline void gpuAssert(cudaError_t code, char *file, int line, bool abort=true)
{
  if (code != cudaSuccess)
  {
    fprintf(stderr, "CUDA_SAFE_CALL: %s %s %d\n",
                                       cudaGetErrorString(code), file, line);
    if (abort) exit(code);
  }
}

#define NUM_THREADS_PER_BLOCK   256
#define NUM_BLOCKS         		16
#define PRINT_TIME         		1
#define SM_ARR_LEN        		50000
#define TOL            			1e-6

#define IMUL(a, b) __mul24(a, b)

void initializeArray1D(float *arr, int len, int seed);

__global__ void kernel_add (int arrLen, float* x, float* y, float* result) {
  const int tid = IMUL(blockDim.x, blockIdx.x) + threadIdx.x;
  const int threadN = IMUL(blockDim.x, gridDim.x);  // Number of thread per grid

  int i;
  // i = blockDim.x*blockIdx.x + threadIdx.x;
  // if(i<arrLen) result[i] = (1e-6 * x[i] ) + (1e-7 * y[i]) + 0.25;

  for(i = tid; i < arrLen; i += threadN) {
    result[i] = (1e-6 * x[i] ) + (1e-7 * y[i]) + 0.25;
  }
}

int main(int argc, char **argv){
  int arrLen = 0;

  // GPU Timing variables
  cudaEvent_t start, stop;
  float elapsed_gpu;

  // Arrays on GPU global memoryc
  float *d_x;
  float *d_y;
  float *d_result;

  // Arrays on the host memory
  float *h_x;
  float *h_y;
  float *h_result;
  float *h_result_gold;

  int i, errCount = 0, zeroCount = 0;

  if (argc > 1) {
    arrLen  = atoi(argv[1]);
  }
  else {
    arrLen = SM_ARR_LEN;
  }

  printf("Length of the array = %d\n", arrLen);

    // Select GPU
    CUDA_SAFE_CALL(cudaSetDevice(0));

  // Allocate GPU memory
  size_t allocSize = arrLen * sizeof(float);
  CUDA_SAFE_CALL(cudaMalloc((void **)&d_x, allocSize));
  CUDA_SAFE_CALL(cudaMalloc((void **)&d_y, allocSize));
  CUDA_SAFE_CALL(cudaMalloc((void **)&d_result, allocSize));

  // Allocate arrays on host memory
  h_x                        = (float *) malloc(allocSize);
  h_y                        = (float *) malloc(allocSize);
  h_result                   = (float *) malloc(allocSize);
  h_result_gold              = (float *) malloc(allocSize);

  // Initialize the host arrays
  printf("\nInitializing the arrays ...");
  // Arrays are initialized with a known seed for reproducability
  initializeArray1D(h_x, arrLen, 2453);
  initializeArray1D(h_y, arrLen, 1467);
  printf("\t... done\n\n");

#if PRINT_TIME
  // Create the cuda events
  cudaEventCreate(&start);
  cudaEventCreate(&stop);
  // Record event on the default stream
  cudaEventRecord(start, 0);
#endif

  // Transfer the arrays to the GPU memory
  CUDA_SAFE_CALL(cudaMemcpy(d_x, h_x, allocSize, cudaMemcpyHostToDevice));
  CUDA_SAFE_CALL(cudaMemcpy(d_y, h_y, allocSize, cudaMemcpyHostToDevice));

  // Launch the kernel
  kernel_add<<<NUM_BLOCKS, NUM_THREADS_PER_BLOCK>>>(arrLen, d_x, d_y, d_result);

  // Check for errors during launch
  CUDA_SAFE_CALL(cudaPeekAtLastError());

  // Transfer the results back to the host
  CUDA_SAFE_CALL(cudaMemcpy(h_result, d_result, allocSize, cudaMemcpyDeviceToHost));

#if PRINT_TIME
  // Stop and destroy the timer
  cudaEventRecord(stop,0);
  cudaEventSynchronize(stop);
  cudaEventElapsedTime(&elapsed_gpu, start, stop);
  printf("\nGPU time: %f (msec)\n", elapsed_gpu);
  cudaEventDestroy(start);
  cudaEventDestroy(stop);
#endif

  // Compute the results on the host
  for(i = 0; i < arrLen; i++) {
    h_result_gold[i] = (1e-6 * h_x[i]) + (1e-7 * h_y[i]) + 0.25;
  }

  // Compare the results
  for(i = 0; i < arrLen; i++) {
    if (abs(h_result_gold[i] - h_result[i]) > TOL) {
      errCount++;
    }
    if (h_result[i] == 0) {
      zeroCount++;
    }
  }

  for(i = 0; i < 50; i++) {
    printf("%d:\t%.8f\t%.8f\n", i, h_result_gold[i], h_result[i]);
  }

  if (errCount > 0) {
    printf("\n@ERROR: TEST FAILED: %d results did not match\n", errCount);
  }
  else if (zeroCount > 0){
    printf("\n@ERROR: TEST FAILED: %d results (from GPU) are zero\n", zeroCount);
  }
  else {
    printf("\nTEST PASSED: All results matched\n");
  }

  // Free-up device and host memory
  CUDA_SAFE_CALL(cudaFree(d_x));
  CUDA_SAFE_CALL(cudaFree(d_y));
  CUDA_SAFE_CALL(cudaFree(d_result));

  free(h_x);
  free(h_y);
  free(h_result);

  return 0;
}

void initializeArray1D(float *arr, int len, int seed) {
  int i;
  float randNum;
  srand(seed);

  for (i = 0; i < len; i++) {
    randNum = (float) rand();
    arr[i] = randNum;
  }
}

```



## Part 2: A simplified SOR
2a. Create a simplified SOR based on the sample code given in class (for the 1D
averaging filter). It should do the following:

- On the host: Create and initialize a 2K⨉2K array of single precision floats. (Is "2k" 2000 or 2048? Either is okay)
- Transfer the array to the GPU
- Create a single block of 16x16 threads (extend the 1D example from the slides to 2D)
- Let each thread operate on a square patch of the input array (rather than a single output element). How big is each patch?
- Run 2000 iterations of SOR – the boundary should not change. You do not need to test for convergence.
- Transfer the output back to the CPU



2b. Write function(s) to perform the same calculation directly (i.e. on the CPU). Compare
your CPU and GPU answers. Are they different? How?

2c. Time both codes (GPU and CPU). How long do they take?

2d. (OPTIONAL) In the work you did so far, the 256 threads (16x16) are each responsible
for multiple elements. There are different ways of deciding what work is done by each
thread — possibities include: 1D strip per thread, 2D tile per thread, interleaved in 1D
(every 256th element), interleaved in 2D (every 16th element of every 16th row). Which one
did you already do in part 2a? Try at least two others.





## Part 3: Multiple blocks
Make the following changes to your GPU code. Check your answer and your timing.

3a. Let each thread operate on a single output array element (like the code in class)

3b. Let the block size be 16x16. Choose the grid dimensions accordingly.

3c. Modify the host code (kernel calls) so that the program executes correctly. That is, the iterations should now be controlled by the host not the GPU (why?).

3d. Check correctness and timing.

**CODE**

```c
/****************************************************************************
   gcc -O1 -std=gnu11 test_SOR.c -lpthread -lrt -lm -o test_SOR
*/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>
#include <pthread.h>

#include <cstdio>
#include <cstdlib>
#include <math.h>

#include "cuPrintf.cu"
#include "cuPrintf.cuh"

// Assertion to check for errors
#define CUDA_SAFE_CALL(ans) { gpuAssert((ans), (char *)__FILE__, __LINE__); }
inline void gpuAssert(cudaError_t code, char *file, int line, bool abort=true)
{
  if (code != cudaSuccess)
  {
    fprintf(stderr, "CUDA_SAFE_CALL: %s %s %d\n",
                                       cudaGetErrorString(code), file, line);
    if (abort) exit(code);
  }
}

#ifdef __APPLE__
/* Shim for Mac OS X (use at your own risk ;-) */
# include "apple_pthread_barrier.h"
#endif /* __APPLE__ */

#define CPNS 2.9    /* Cycles per nanosecond -- Adjust to your computer, for example a 3.2 GhZ GPU, this would be 3.2 */

/* A, B, and C needs to be a multiple of your BLOCK_SIZE,
   total array size will be (GHOST + Ax^2 + Bx + C) */
#define OPTIONS 1
#define NUM_TESTS 3

#define A   8*8  /* coefficient of x^2 */
#define B   16*5  /* coefficient of x */
#define C   32  /* constant term */

// Things for SOR
#define GHOST 2   /* 2 extra rows/columns for "ghost zone". */
#define MINVAL   0.0
#define MAXVAL  10.0
#define TOL 0.001
#define OMEGA 1.9       // TO BE DETERMINED

// Things for running on GPU
#define NUM_THREADS_PER_BLOCK   256 // Number of threads per block
#define NUM_BLOCKS         16       // Number of block in a grid
#define PRINT_TIME         1        // Whether we want to measure time cost (1/0)
#define SM_ARR_LEN         2048     // array length
// #define SM_ARR_LEN         64     // array length


/* Prototypes */

void SOR(int rowlen, float *data, int iterations);
__global__ void cuda_simple_SOR(int rowlen, float *data, double change);
__global__ void cuda_SOR(int rowlen, float *data);
void initializeArray1D(float *arr, int len, int seed);
void initializeArray2D(float *arr, int len, int seed);

/* -=-=-=-=- Time measurement by clock_gettime() -=-=-=-=- */
/*
  As described in the clock_gettime manpage (type "man clock_gettime" at the
  shell prompt), a "timespec" is a structure that looks like this:
 
        struct timespec {
          time_t   tv_sec;   // seconds
          long     tv_nsec;  // and nanoseconds
        };
 */

double interval(struct timespec start, struct timespec end)
{
  struct timespec temp;
  temp.tv_sec = end.tv_sec - start.tv_sec;
  temp.tv_nsec = end.tv_nsec - start.tv_nsec;
  if (temp.tv_nsec < 0) {
    temp.tv_sec = temp.tv_sec - 1;
    temp.tv_nsec = temp.tv_nsec + 1000000000;
  }
  return (((double)temp.tv_sec) + ((double)temp.tv_nsec)*1.0e-9);
}
/*
     This method does not require adjusting a #define constant

  How to use this method:

      struct timespec time_start, time_stop;
      clock_gettime(CLOCK_REALTIME, &time_start);
      // DO SOMETHING THAT TAKES TIME
      clock_gettime(CLOCK_REALTIME, &time_stop);
      measurement = interval(time_start, time_stop);
 */


/* -=-=-=-=- End of time measurement declarations =-=-=-=- */



/*****************************************************************************/
int main(int argc, char *argv[])
{
  int OPTION;
  struct timespec time_start, time_stop;
  double time_stamp;
  int iterations = 2000;   // Number of iterations to run SOR
  double change = 1.0e10;   /* start w/ something big */
  // GPU Timing variables
  cudaEvent_t start, stop;
  float elapsed_gpu;

  int arrLen = GHOST + SM_ARR_LEN;   // N x N matrix
  int N = arrLen;   // an alias to arrLen

  printf("SOR serial variations \n");

  printf("Length of the row = %d\n", N);
  size_t alloc_size = (N*N) * sizeof(float);
  printf("Allocation size in byte = %ld\n", alloc_size);
	
  // Allocate arrays on host memory and initialize them
  // float *data = (float *) calloc(N*N, sizeof(float));
  float *data = (float *) malloc(N*N * sizeof(float));
  initializeArray2D(data, N, 1111);  // Yes, the input here is row length
  
  // Launch the SOR function
  clock_gettime(CLOCK_REALTIME, &time_start);
  SOR(arrLen, data, iterations);     // N is row_length; data: the matrix; iterations: number of iterations 
  clock_gettime(CLOCK_REALTIME, &time_stop);
  time_stamp = interval(time_start, time_stop);

  printf("All times are in cycles (if CPNS is set correctly in code)\n");
  printf("\n");
  printf("array_len, SOR time, SOR iters\n");
  printf("%4d, %10.4g, %d", arrLen, (double)CPNS * 1.0e9 * time_stamp, iterations);
  printf("\n");



  printf("==========> All CPU tests are done! Now, running GPU code!\n");

  // Select GPU
  // CUDA_SAFE_CALL(cudaSetDevice(0));
  
  // Allocate arrays on host memory
  // float host_data[N*N];       // Arrays on the host memory
  float *host_data = (float *) malloc(N*N * sizeof(float));
  // Initialize the host arrays

  printf("\nInitializing the arrays ...\n");
  // srand(1111);
  // for (int i = 0; i < N*N; i++) {
  //   host_data[i] = (float) rand();
  // }
  initializeArray2D(host_data, arrLen, 1111);    // Arrays 2D matrix on Host machine with a known seed for reproducability
  printf("\t... done\n\n");
  
  // Allocate GPU memory
  float *dev_data;    // Arrays on GPU global memoryc
  cudaMalloc((void **)&dev_data, alloc_size);

#if PRINT_TIME
  // Create the cuda events
  cudaEventCreate(&start);
  cudaEventCreate(&stop);
  // Record event on the default stream
  cudaEventRecord(start, 0);
#endif
  // Transfer the arrays to the GPU memory
  CUDA_SAFE_CALL(cudaMemcpy(dev_data, host_data, alloc_size, cudaMemcpyHostToDevice));

  // Launch the kernel
  cudaPrintfInit();
  dim3 dimGrid(SM_ARR_LEN/16, SM_ARR_LEN/16);   // Shape of grid
  dim3 dimBlock(16, 16);    // Each block has shape of <16, 16>, so 256 threads/block
  // So each grid has shape (128 x 128), and each block has shape (16, 16)

  // Or
  // #define SM_ARR_LEN 2048           // array/vector size
  // #define NUM_THREADS_PER_BLOCK   16 // Number of threads per block
  // // #define NUM_BLOCKS         1      // Number of block in a grid
  // dim3 dimGrid( ceil(SM_ARR_LEN/NUM_THREADS_PER_BLOCK), ceil(SM_ARR_LEN/NUM_THREADS_PER_BLOCK));   // Shape of grid
  // dim3 dimBlock(NUM_THREADS_PER_BLOCK, NUM_THREADS_PER_BLOCK);    // Each block has shape of <16, 16>, so 256 threads/block

  int iters = 0;
  while (iters < 1) {
    iters++;
    cuda_simple_SOR<<<dimGrid, dimBlock>>>(arrLen, dev_data, change);
    // cuda_SOR<<<dimGrid, dimBlock>>>(arrLen, d_data);
  }
  printf("    SOR() done after %d iters\n", iters);
  
  cudaPrintfDisplay(stdout, true); cudaPrintfEnd();

  // Check for errors during launch
  CUDA_SAFE_CALL(cudaPeekAtLastError());

  // Transfer the results back to the host
  CUDA_SAFE_CALL(cudaMemcpy(host_data, dev_data, alloc_size, cudaMemcpyDeviceToHost));
  // Free-up device and host memory
  CUDA_SAFE_CALL(cudaFree(dev_data));

  #if PRINT_TIME
    // Stop and destroy the timer
    cudaEventRecord(stop,0);
    cudaEventSynchronize(stop);
    cudaEventElapsedTime(&elapsed_gpu, start, stop);
    printf("\nGPU time: %f (msec)\n", elapsed_gpu);
    cudaEventDestroy(start);
    cudaEventDestroy(stop);
  #endif
  // free(h_data);


  // Comparing the result we obtained from kernel function and regular SOR:
  int errCount, zeroCount = 0;
  for (int i=0; i<N*N; i++){
    if (abs(data[i] - host_data[i]) > TOL) {
      errCount++;
    }
    if (host_data[i] == 0.0) {
      zeroCount++;
    }
  }
  if (errCount > 0) {
    printf("\n@ERROR: TEST FAILED: %d results did not match\n", errCount);
  }
  else if (zeroCount > 0){
    printf("\n@ERROR: TEST FAILED: %d results (from GPU) are zero\n", zeroCount);
  }
  else {
    printf("\nTEST PASSED: All results matched\n");
  }


  return 0;
} /* end main */



/*********************************/
void initializeArray1D(float *arr, int len, int seed) {
  int i;
  float randNum;
  srand(seed);

  for (i = 0; i < len; i++) {
    randNum = (float) rand();
    arr[i] = randNum;
  }
}

void initializeArray2D(float *arr, int len, int seed) {
  int i;
  srand(seed);

  if (len > 0){
    for (i = 0; i < len*len; i++) {
      arr[i] = (float) rand();
    }
  }
}

/************************************/

/* SOR */
void SOR(int rowlen, float *data, int iterations){
  long int i, j;
  double change, total_change = 1.0e10;   /* start w/ something big */
  int iters = 0;

  printf("Hello from SOR in CPU");
  while (iters < iterations) {
    iters++;
    total_change = 0;
    for (i = 1; i < rowlen-1; i++) {
      for (j = 1; j < rowlen-1; j++) {
        change = data[i*rowlen+j] - .25 * (data[(i-1)*rowlen+j] +
                                          data[(i+1)*rowlen+j] +
                                          data[i*rowlen+j+1] +
                                          data[i*rowlen+j-1]);
        data[i*rowlen+j] -= change * OMEGA;
        if (change < 0){
          change = -change;
        }
        total_change += change;
      }
    }
    if (abs(data[(rowlen-2)*(rowlen-2)]) > 10.0*(MAXVAL - MINVAL)) {
      printf("SOR: SUSPECT DIVERGENCE iter = %d\n", iters);
      break;
    }
  }
  printf("    SOR() done after %d iters\n", iters);
}


// dim3 dimGrid(16, 1, 1);   // Shape of grid
// dim3 dimBlock(16, 16);    // Each block has shape of <16, 16>, so 256 threads/block
// cuda_SOR<<<dimGrid, dimBlock>>>(arrLen, d_data);
/* SOR 
  rowlen: the row length of matrix
  data: a pointer to data matrix
*/
__global__ void cuda_simple_SOR(int rowlen, float *data, double change){
  int i, j;
  i = threadIdx.x + blockIdx.x * blockDim.x;
  j = threadIdx.y + blockIdx.y * blockDim.y;
  // printf("Hello from cuda_simple_SOR!\n");
  // change should be shared amount threads, right? --> So, how should we do that???
  // Who I am??
  // for (i = threadStartId_row; i < threadEndId_row; i++) {
  //   for (j = threadStartId_col; j < threadEndId_col; j++) {

    if (i<rowlen && j < rowlen){
      change = data[i*rowlen+j] - .25 * (data[(i-1)*rowlen+j] +
                                        data[(i+1)*rowlen+j] +
                                        data[i*rowlen+j+1] +
                                        data[i*rowlen+j-1]);
      __syncthreads();    // Must SYNC between read nad writes. Otherwise there is a race condition, and some threads may read data that has alread been written.
      data[i*rowlen+j] -= change * OMEGA;
      // cuPrintf("data: %f\n", data[i*rowlen+j]);
    }
  //   }
  // }
}

__global__ void cuda_SOR(int rowlen, float *data){
  int i, j;
  double change, total_change = 1.0e10;   /* start w/ something big */
  // i = threadIdx.x + blockIdx.x * blockDim.x;
  // j = threadIdx.y + blockIdx.y * blockDim.y;

  // Block index 
  const int bId_x = blockIdx.x;
  const int bId_y = blockIdx.y;
  // Local thread index
  const int local_tid_x = threadIdx.x;
  const int local_tid_y = threadIdx.y;

  // Number of element need to be evaluated for a rows and columns for each grid
  const int rows_per_block = rowlen / gridDim.x;
  const int cols_per_block = rowlen / gridDim.y;

  // Number of element need to be evaluated for a rows and columns for each block
  const int rows_per_thread = rows_per_block / blockDim.x;
  const int cols_per_thread = cols_per_block / blockDim.y;

  // Row and columns start/ending indices for current block
  const int blockStartId_row = bId_x * rows_per_block;
  const int blockEndId_row = (bId_x+1) * rows_per_block - 1;
  const int blockStartId_col = bId_y * cols_per_block;
  const int blockEndId_col = (bId_y+1) * cols_per_block - 1;

  // Row and columns start/ending indices for current threads
  const int threadStartId_row = blockStartId_row + local_tid_x * rows_per_thread;
  const int threadEndId_row = blockEndId_row + (local_tid_x+1) * rows_per_thread -1;
  const int threadStartId_col = blockStartId_col + local_tid_y * cols_per_thread;
  const int threadEndId_col = blockEndId_col + (local_tid_y+1) * cols_per_thread -1;


  // cuPrintf("[block#, thread#]: value\n");
  // while ((total_change/(double)(rowlen*rowlen)) > (double)TOL) {
  // while (iters < 2000) {    // In lab7, we run SOR 2000 iters on 2k x 2k array
  //   iters++;
  total_change = 0;
  // Who I am??
  for (i = threadStartId_row; i < threadEndId_row; i++) {
    for (j = threadStartId_col; j < threadEndId_col; j++) {
      change = data[i*rowlen+j] - .25 * (data[(i-1)*rowlen+j] +
                                        data[(i+1)*rowlen+j] +
                                        data[i*rowlen+j+1] +
                                        data[i*rowlen+j-1]);
      __syncthreads();    // Must SYNC between read nad writes. Otherwise there is a race condition, and some threads may read data that has alread been written.
      data[i*rowlen+j] -= change * OMEGA;
      if (change < 0){
        change = -change;
      }
      total_change += change;
    }
  }
}


```





3e. (OPTIONAL) Try using thread control as in Part 2. For this to be interesting should also try different mappings of array elements to threads.

NOTE: Because of the difference in precision and various floating point technical issues,
you will probably see some drift between the GPU version and the reference version even
with correct code. You should be able to handle this by increasing the epsilon to, say,
5%.

NOTE: In past years many students have found cuPrintf useful; the relevant files are
"cuPrintf.cu" and "cuPrintf.cuh", and are included with this assignment. See
"Using cuPrintf.pdf" for instructions.