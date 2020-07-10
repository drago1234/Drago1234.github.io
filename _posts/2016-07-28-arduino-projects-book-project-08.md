---
title: 'Arduino Projects Book - Project 08: Digital Hourglass'
date: '2016-07-28 19:42:55'
categories:
  - Arduino
tags:
  - arduino_uno
  - arduino_projects_book
  - breadboarding
  - led
  - switch
  - timer
excerpt: >-
  Once upon a time, people used hourglasses to measure elapsed time... Today,
  I'm coming back to Arduino, and I'll write about the eight project of the
  Arduino Projects Book - Digital Hourglass.
---

## **OVERVIEW:**

Once upon a time, people used hourglasses to measure time. An hourglass is most similar to a flask, but the narrow part lies in the center of its body instead of the neck. That narrow part divides the hourglass into two equal parts; each one has a shape like a cauldron but more vertically stretched. In order to measure the elapsed time, people fill one part of the hourglass with sand and then flip the hourglass so that sand will be dropped smoothly to the other part.

![hourglass](/images/arduino-projects-book-project-08/hourglass.jpg)

Nowadays, we use digital clocks and watches to measure time, many of which are even programmed to measure the elapsed time or to become a countdown timer. Today, I'm coming back to Arduino, and I'll write about the eight project of the Arduino Projects Book - Digital Hourglass.

## **TILT SWITCH:**

The tilt switch is a switch that can detect the tilting of an object or the tilting of itself.

![tilt-switch-lie](/images/arduino-projects-book-project-08/tilt-switch-lie.jpg)

![tilt-switch-stand](/images/arduino-projects-book-project-08/tilt-switch-stand.jpg)

There is a small conducting ball inside the tilt switch, acting as a sensor of the switch. Once we tilt the switch steeply enough, the ball will connect the two separate legs, and the switch will be closed.

My tilt switch has 4 legs while the book only demonstrates the two-leg tilt switch. That's totally fine. We can put any leg into the breadboard since they are not connected without tilting.

## **PARTS:**

- 1 x Arduino UNO

![arduino-uno](/images/arduino-uno.jpg)

- 1 x Breadboard

![breadboard](/images/breadboard.jpg)

- 6 x LEDs
- 6 x 220-ohm resistors
- 1 x Tilt switch
- 1 x 10-kilohm resistor
- 10 x Jumper wires

![parts](/images/arduino-projects-book-project-08/parts.jpg)

## **BREADBOARD LAYOUT:**

Here are my EAGLE schematic and virtual breadboard layout.

![schematic](/images/arduino-projects-book-project-08/schematic.png)

![breadboard-layout](/images/arduino-projects-book-project-08/breadboard-layout.jpg)

And this is my real board circuit:

![build](/images/arduino-projects-book-project-08/build.jpg)

1. Digital output ~> LED's Anode ~> LED ~ LED Cathode ~> 220-ohm resistor ~> GND
2. +5V ~> Switch ~ (Digital Input & 10-kilohm resistor) ~> GND

## **CODE:**

[Recall]({{ site.url }}{{ site.baseurl }}/arduino/2016/01/10/arduino-projects-book-project-06/#arduino-code) that `millis()` function counts the time elapsed after its last call, whereas the `delay()` function completely pauses the Arduino for a given time.

Here is the code: 

<?prettify?>
<pre class="prettyprint cpp-html linenums">
/**
 * Project Name: Arduino Projects Book - Project 08: Digital Hourglass
 *
 * File Name: digital_hourglass.ino
 *
 * Description: Turns on an LED every 2 second. Operates like an hourglass.
 *
 * Author: Zhengqi Dong
 * Location:  
 * Created: July 27, 2016
 * Updated: June 22, 2017
 */

// Required hardware I/O connections
const byte LED_1_PIN   = 2; // connect led1 to 2
const byte LED_2_PIN   = 3; // connect led2 to ~3
const byte LED_3_PIN   = 4; // connect led3 to 4
const byte LED_4_PIN   = 5; // connect led4 to ~5
const byte LED_5_PIN   = 6; // connect led5 to ~6
const byte LED_6_PIN   = 7; // connect led6 to 7
const byte SWITCH_PIN = 8; // connect tilt switch to 8

// Global variables
unsigned long prev_time = 0;
byte switch_state       = 0;
byte prev_switch_state  = 0;
byte current_led        = LED_1_PIN;
unsigned long interval  = 2000; // time delay between each event

void setup() {
    for (byte led = LED_1_PIN; led <= LED_6_PIN; led++) {
        pinMode(led, OUTPUT);
    }
    pinMode(SWITCH_PIN, INPUT);
}

void loop() {
    // start the timer and set the new current time
    unsigned long current_time = millis();

    // check the time
    if (current_time - prev_time > interval) {
        prev_time = current_time;        // store the current time
        digitalWrite(current_led, HIGH); // turn on the current LED

        // once the time is up (all LEDs are turned on)
        if (current_led == LED_6_PIN) {
            // make blink effect
            for (byte t = 0; t < 4; t++) {
                for (byte led = LED_1_PIN; led <= LED_6_PIN; led++) {
                    digitalWrite(led, HIGH); // flashing on
                }

                if (t < 3) {
                    delay(250);  // for 0.25 second
                } else {
                    delay(1000); // the last flash takes 1 second
                }

                for (byte led = LED_1_PIN; led <= LED_6_PIN; led++) {
                    digitalWrite(led, LOW); // flashing off
                }
                delay(250);                 // for 0.25 second
            }
            // restart the LED pin
            current_led = LED_1_PIN;
        } else {
            current_led++; // go to next LED pin
        }
    }

    // check the tilt switch
    switch_state = digitalRead(SWITCH_PIN);

    // flip the light if the tilt switch is flipped
    if (switch_state != prev_switch_state) {
        // restart the process - turn off all LEDs
        for (byte led = LED_1_PIN; led <= LED_6_PIN; led++) {
            digitalWrite(led, LOW);
        }
        // go back to the first LED
        current_led = LED_1_PIN;
        // store the current time
        prev_time = current_time;
    }
    // store the current switch state
    prev_switch_state = switch_state;
}
</pre>
<!-- 
## **USING:**

<div class="embedded-video">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/NKXcaV8tidg?list=PLt_UZum7NVtmFEVMdv4XH8TgXzJvzd78x" frameborder="0" allowfullscreen></iframe>
</div> -->
