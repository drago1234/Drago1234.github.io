---
title: 'Arduino Projects Book - Project 10: Zoetrope'
date: '2016-08-23 14:57:35'
categories:
  - Arduino
tags:
  - arduino_projects_book
  - arduino_uno
  - breadboarding
  - ic
  - motor
  - potentiometer
  - pwm
  - switch
excerpt: >-
  In the past when people had not yet invented the television, movie theaters
  used a very long ribbon of static images and rolled it very fast to create an
  illusion of a video clip. The device that helped them make movies using that
  method is called **zoetrope**. Today, I'm gonna use the Arduino and a DC motor
  to simulate how Zoetrope works.
---

## **OVERVIEW:**

In the past when people had not yet invented the television, movie theaters used a very long ribbon of static images and rolled it very fast to create an illusion of a video clip. The device that helped them make movies using that method is called **Zoetrope**. Today, I'm gonna use the Arduino and a DC motor to simulate how Zoetrope works.

## **L293D H-BRIDGED INTEGRATED CIRCUIT:**

The key to controlling the DC motor in this project is the **H-bridge IC**. It's called **integrated circuit** because there are many tiny circuits inside it, sometimes identical ones. IC makes the circuit tidier and helps the wiring much easier. For instance, in this project, we can have the full control of the DC motor using this IC alone, whereas we had to use a MOSFET and a diode to operate the motor in [the previous project]({{ site.url }}{{ site.baseurl }}/arduino/2016/08/13/arduino-projects-book-project-09/).

![l293dne](/images/arduino-projects-book-project-10/l293dne.jpg)

There is a variety of ICs, so understanding the structure of the one we want to use is crucial. In fact, **we must look at the datasheet of an IC to know what exactly it does**. Here is important information I snipped from the sheet

![ic-pins](/images/arduino-projects-book-project-10/ic-pins.png)

The figure on the left shows the pin structure of the 20-pin IC; I don't use it, so I just ignore it. I'm using the 16-pin IC with 8 pins on each side. This structure can be divided into 4 identical parts. They are identical and have the same functions: input, output, and ground.

- `ENABLE 1` **is responsible for powering up the left bus which contains Circuit 1 and Circuit 2;** `ENABLE 2` **powers the right bus which contains circuit 3 and circuit 4.** This time we connect `~9` to `ENABLE 1` and leave the `ENABLE 2` alone because we only use the left bus.
- Since we plan to control the **direction** of the DC motor, we can hook one lead of the motor to `OUTPUT 1` and the other lead to `OUTPUT 2`. **Circuit 1 and Circuit 2 act like a polarity-controlled diode, which means they can change the one-way direction of the current according to `INPUT 1` and `INPUT 2`**. If `INPUT 1 = HIGH` and `INPUT 2 = LOW`, the current will flow from `OUTPUT 1` to `OUTPUT 2`, resulting in the motor spinning in one direction; the vice versa is also true, resulting in the motor spinning in another direction.
- **V<sub>s</sub>** should be connected to `+9V` because the motor draws a lot of energy, whereas the **V<sub>ss</sub>** should be connected to `+5V` of the Arduino.

For more information, see the [IC data sheet](https://github.com/philectron/arduino/blob/master/data_sheets/st_L293D_IC.pdf).

## **PULSE-WIDTH MODULATION (PWM):**

Pulse-width modulation is to modulate the width of the pulse. We can lengthen or shorten the `HIGH` duration of a signal without changing its frequency. For full information about PWM and `analogWrite`, please visit [Arduino's official tutorial](https://www.arduino.cc/en/Tutorial/PWM).

## **PARTS:**

- 1 x Arduino UNO

![arduino-uno](/images/arduino-uno.jpg)

- 1 x Breadboard

![breadboard](/images/breadboard.jpg)

- 1 x DC motor
- 1 x 9-volt battery
- 1 x H-bridged IC
- 2 x Switches
- 2 x 10-kilohm resistors
- 1 x Rotary potentiometer
- 1 x Battery snap
- 17 x Jumper wires

![parts](/images/arduino-projects-book-project-10/parts.jpg)

## **CIRCUIT:**

As usual, here is the schematic:

![schematic](/images/arduino-projects-book-project-10/schematic.png)

And this is the virtual layout of my breadboard:

![breadboard-layout](/images/arduino-projects-book-project-10/breadboard-layout.jpg)

As always, they are available on [my GitHub](https://github.com/philectron/pcb/tree/master/arduino_repo/zoetrope). Finally, this is how I wired my circuit:

![build](/images/arduino-projects-book-project-10/build.jpg)

## **CODE:**

See below for my code, or [view it on my GitHub](https://github.com/philectron/arduino/blob/master/zoetrope/zoetrope.ino).

<?prettify?>
<pre class="prettyprint cpp-html linenums">
/**
 * Project Name: Arduino Projects Book - Project 10: Zoetrope
 *
 * File Name: zoetrope.ino
 *
 * Description: Controls the speed and the direction of the DC motor using
 * two switches and a potentiometer.
 *
 * Author: Phi Luu
 * Location: Portland, Oregon, United States
 * Created: August 21, 2016
 * Updated: June 22, 2017
 */

// Required hardware I/O connections
const byte POT_PIN              = A0; // connect potentiometer to A0
const byte IC_INPUT_1           = 3;  // connect IC Input1 to ~3
const byte IC_INPUT_2           = 2;  // connect IC Input2 to 2
const byte IC_ENABLE_1          = 9;  // connect IC Enable1 t ~9
const byte DIRECTION_SWITCH_PIN = 4;  // connect direction switch to 4
const byte STATE_SWITCH_PIN     = 5;  // connect state switch to ~5

// Global variables
byte state_switch_val          = 0;   // state switch
byte direction_switch_val      = 0;   // direction switch
byte prev_state_switch_val     = 0;   // previous state switch
byte prev_direction_switch_val = 0;   // previous direction switch
byte motor_is_enabled          = 0;   // whether the motor is on/off
byte motor_direction           = 0;   // motor direction
unsigned short motor_speed     = 0;

void setup() {
    pinMode(DIRECTION_SWITCH_PIN, INPUT);
    pinMode(STATE_SWITCH_PIN,     INPUT);
    pinMode(IC_INPUT_1,           OUTPUT);
    pinMode(IC_INPUT_2,           OUTPUT);
    pinMode(IC_ENABLE_1,          OUTPUT);
}

void loop() {
    state_switch_val = digitalRead(STATE_SWITCH_PIN);
    delay(1);
    direction_switch_val = digitalRead(DIRECTION_SWITCH_PIN);
    motor_speed          = analogRead(POT_PIN) / 4;

    // process the on/off state of the motor from the state switch
    if (state_switch_val != prev_state_switch_val) {
        if (state_switch_val) {
            motor_is_enabled = !motor_is_enabled;
        }
    }

    // process the direction of the motor from the direction switch
    if (direction_switch_val != prev_direction_switch_val) {
        if (direction_switch_val) {
            motor_direction = !motor_direction;
        }
    }

    // control the direction of the motor using the IC
    if (motor_direction) {
        digitalWrite(IC_INPUT_1, LOW);
        digitalWrite(IC_INPUT_2, HIGH);
    } else {
        digitalWrite(IC_INPUT_1, HIGH);
        digitalWrite(IC_INPUT_2, LOW);
    }

    // control the on/off state of the motor using PWM
    if (motor_is_enabled) {
        analogWrite(IC_ENABLE_1, motor_speed);
    } else {
        analogWrite(IC_ENABLE_1, 0);
    }

    // prep for next inputs
    prev_state_switch_val     = state_switch_val;
    prev_direction_switch_val = direction_switch_val;
}
</pre>

## **USING:**

There should have been a colorful pinwheel with a black ribbon standing on it and a ribbon of static images inside, but I messed up the ribbons. So, I just wanted my project to be simple.

<div class="embedded-video">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/nnkOkdtcqCw?list=PLt_UZum7NVtmFEVMdv4XH8TgXzJvzd78x" frameborder="0" allowfullscreen></iframe>
</div>
