---
title: 'Arduino Projects Book - Project 07: Keyboard Instrument'
date: '2016-05-03 21:33:35'
categories:
  - Arduino
tags:
  - arduino_uno
  - arduino_projects_book
  - breadboarding
  - dac
  - sound
  - switch
excerpt: >-
  Hi there! I'm back with a new project from the Arduino Projects Book -
  Keyboard Instrument. In this project, we will learn how to control a piezo
  buzzer using switches. We will also play some music, so let's tune in.
---

## **OVERVIEW:**

Hi there! I'm back with a new project from the Arduino Projects Book - Keyboard Instrument. In this project, we will learn how to control a piezo buzzer using switches. We will also play some music, so let's tune in.

## **PARTS:**

- 1 x Arduino UNO

![arduino-uno](/images/arduino-uno.jpg)

- 1 x Breadboard

![breadboard](/images/breadboard.jpg)

- 1 x Piezo buzzer
- 4 x Switches
- 1 x 220-ohms resistor
- 2 x 10-kilohm resistors
- 1 x 1-megohm resistor
- 9 x Jumper wires

![parts](/images/arduino-projects-book-project-07/parts.jpg)

## **BREADBOARD LAYOUT:**

There is a new resistor wiring method, called **resistor ladder**.

1. This is **a way to read a number of switches using the analog input**. It's more helpful than using the digital input.
2. We'll hook up a number of switches that are connected in **parallel** to an analog pin (i.e. A0).
3. Most of the switches will connect to power **through a resistor**.
4. How it works: When we press each button, a different voltage level will pass to the input pin. If we press two buttons at the same time, we'll get a unique input based on the two resistors in parallel (that's why we need to **hook them up in parallel**).

Now let's take a look at my schematic:

![schematic](/images/arduino-projects-book-project-07/schematic.png)

and the breadboard layout:

![breadboard-layout](/images/arduino-projects-book-project-07/breadboard-layout.jpg)

They are also available on [my GitHub](https://github.com/philectron/pcb/tree/master/arduino_repo/keyboard_instrument). This is my real board layout:

![build](/images/arduino-projects-book-project-07/build.jpg)

## **CODE:**

<p align="center">
  <font face="consolas">
    <font color="9f9f8f">noTone</font>(BUZZER_PIN);
  </font>
</p>

`noTone()` is used to **mute** the buzzer. There is only 1 parameter for this function, which is the **pin number**.

Below is [my code](https://github.com/philectron/arduino/blob/master/keyboard_instrument/keyboard_instrument.ino).

<?prettify?>
<pre class="prettyprint cpp-html linenums">
/**
 * Project Name: Arduino Projects Book - Project 07: Keyboard Instrument
 *
 * File Name: keyboard_instrument.ino
 *
 * Description: Simulates keys C, D, E, and F of the real piano
 * using push buttons and piezo buzzer.
 *
 * Author: Zhengqi Dong
 * Location:  
 * Created: March 05, 2016
 * Updated: June 22, 2017
 */

// Required hardware I/O connections
const byte KEYBOARD  = A0;                  // connect keyboard to A0
const byte PIEZO_PIN = 8;                   // connect buzzer to 8

// Global constants
const int NOTES[] = { 262, 294, 330, 349 }; // C, D, E, F frequencies
const unsigned int BAUD_RATE = 9600;        // serial monitor's baud rate

// Global variables
unsigned int key_val;

void setup() {
    Serial.begin(BAUD_RATE);    // start the serial monitor
    pinMode(PIEZO_PIN, OUTPUT); // set PIEZO_PIN as OUTPUT
}

void loop() {
    // read and print KEYBOARD value
    key_val = analogRead(KEYBOARD);
    Serial.print("key_val = ");
    Serial.println(key_val);

    if (key_val == 1023) {
        tone(PIEZO_PIN, NOTES[0]); // first switch ~ key C
    } else if ((key_val >= 990) && (key_val <= 1010)) {
        tone(PIEZO_PIN, NOTES[1]); // second switch ~ key D
    } else if ((key_val >= 505) && (key_val <= 515)) {
        tone(PIEZO_PIN, NOTES[2]); // third switch ~ key E
    } else if ((key_val >= 5) && (key_val <= 10)) {
        tone(PIEZO_PIN, NOTES[3]); // fourth switch ~ key F
    } else {
        noTone(PIEZO_PIN);         // no switch ~ no sound
    }
}
</pre>

## **USING:**

<div class="embedded-video">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/Qh331iU0kyU?list=PLt_UZum7NVtmFEVMdv4XH8TgXzJvzd78x" frameborder="0" allowfullscreen></iframe>
</div>
