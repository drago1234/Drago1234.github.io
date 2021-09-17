---
title: 'Arduino Projects Book - Project 02: SOS -- Morse Code Emergence Distress Singal'
date: '2015-09-26 17:06:46'
categories:
  - Arduino
tags:
  - arduino_uno

excerpt: >-
  In this lab, I modified the original project to a SOS signal indicator. 
---

## **Motivation**
Imagine a situation where the Flash floods swept through your hometown, and your house was surrounded by the water, What to do? 
![flood](/images/arduino-projects-book-project-02/flood.jpg)

What might be a easy way to send a helping message? ==> S.O.S

But, next question is how you want to send it? 
- Write a message in your house? --> What about the hylicoptor flighting at night?
- Using flashlight as indicator? --> Cool, but are you gonna standing at your house and doing this whole day?

Now, let me show you a good idea to achieve this with an Arduino board, a couple of LED lights, some resistors, and some wires. After finish this lab, you will be able to implement this on your own less than an hour!

## **Idea:**
Encode the S.O.S message as Morse code, and repeatefly flash the LED at specific frequency!

Specifically, Here is the Morse code translation:
- S --> "..." --> 2 milisecond flash
- O --> "- - -" --> 5 milisecond flash

In this example, I used 2 milisecond flash to represent ".", and 5 milisecond flash to represent "-".  Then, you just throw this into a loop, Power up the kits, Open a favorite TV channel, and Waiting for the help!

---
## **Lab Setup:**

Supplies:
- Switch
- 3 LED light
- 3 220-ohm Resistors
- 1 10-kilohm Resistor
---
## **DESIGN THE CIRCUIT:**

Circuit Diagrams and Schematic Diagrams:

![schematic diagram](/images/arduino-projects-book-project-02/circuit_diagram_and_schematic_diagram.jpg)


The actually setup:

![build](/images/arduino-projects-book-project-02/build.png)

---
## **THE CODE:**

<p align="center"><font face="consolas"><b>pinMode(pin, state);</b></font></p>

You use function `pinMode()` whenever you have a wire connected to the Arduino board, and you want to specify whether you want to use it as input or output. For example: `pinMode(3, OUTPUT)` says "set pin3 as output".

<p align="center"><font face="consolas"><b>digitalRead(pin);</b></font></p>


<p align="center"><font face="consolas"><b>digitalWrite(pin, state);</b></font></p>
Telling Arduino which pin you want to turn on/off? Ex. `digitalWrite(3, HIGH)`, says "turn on the the LED connected at pin3".

Here are the entire code that I used: 

{% highlight c linenos %}
/**
 * Project Name: Arduino Projects Book - Project 02: SOS -- Morse Code Emergence Distress Singal
 * File Name: Project2_SOS_LED_version.ino
 * Description: 
 * Author: Zhengqi Dong
 * Created:
 * Updated:
 */
 #define ledPin 4

int duration[] = {200, 200, 200, 500, 500, 500, 200, 200, 200};
int swtichState = 0;
void setup() {
  pinMode(2, INPUT);
  pinMode(3, OUTPUT);
  pinMode(4, OUTPUT);
  pinMode(5, OUTPUT);
}

/* Function: blink the red LED when button is pressed. */
void loop() {
  swtichState = digitalRead(2);
  if(swtichState == LOW){
    digitalWrite(3, HIGH);  //green LED
    digitalWrite(4, LOW);   //red LED
    digitalWrite(5, LOW);   //red LED
  }else{ //button is pressed
    digitalWrite(3, LOW);
    int i;
    for(i =0; i<9; i++){
      flash(duration[i]);
    }
    delay(1000);
    digitalWrite(4, HIGH);
    digitalWrite(5, LOW);
    delay(250);   //pause for 2.5 ms
    digitalWrite(4, LOW);
    digitalWrite(5, HIGH);
    delay(250);
  }
}

void flash(int delayPeriod){
  digitalWrite(ledPin, HIGH);
  delay(delayPeriod);
  digitalWrite(ledPin, LOW);
  delay(delayPeriod);
}
{% endhighlight %}

## Video Showcase
<div class="embedded-video">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/4uTRCNTmnDw" frameborder="0" allowfullscreen></iframe>
</div>

## **Bonus: Resistor color code cheetsheet**
![resistor_color_code](/images/arduino-projects-book-project-02/resistor_color_code.jpg
)

## **Reference:**
Fitzgerald, S., & Shiloh, M. _Arduino Projects Book_. Arduino AG, 2017

