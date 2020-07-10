---
title: 'Arduino Projects Book - Project 12: Knock Lock'
date: '2016-09-06 17:16:00'
categories:
  - Arduino
tags:
  - arduino_projects_book
  - arduino_uno
excerpt: >-
  People protect their property in many different ways. One way they can do that
  is to equip fancy security systems. Those things are expensive, though.
  Therefore, in this project, we will use an Arduino, a piezo buzzer, and a
  servo motor to make a cheap security system to protect our valuable stuff.
---

## **OVERVIEW:**

People protect their property in many different ways. One way they can do that is to equip fancy security systems. Those things are expensive, though. Therefore, in this project, we will use an Arduino, a piezo buzzer, and a servo motor to make a cheap security system to protect our valuable stuff.

A special thing in this project that interests me is the creative use of the piezo buzzer. Usually, we use the buzzer to make a sound as I demonstrated in [light theremin]({{ site.url }}{{ site.baseurl }}/arduino/2016/01/10/arduino-projects-book-project-06) and [keyboard instrument]({{ site.url }}{{ site.baseurl }}/arduino/2016/05/03/arduino-projects-book-project-07/). But now, we use it as a microphone. We are taking advantage of the processor's capability to read analog signals through its ADC. In this case, we transform the intensity of the sound we knock into a value in the range `0..1024`, in which `0` represents **0V**, and `1024` represents **5V** at the input of the six analog pins.

Because **the piezo buzzer is very sensitive to sound, we will use a 1-megaohm resistor** so that we don't have to have 100% accuracy on our knocks.

## **PARTS:**

- 1 x Arduino UNO

![arduino-uno](/images/arduino-uno.jpg)

- 1 x Breadboard

![breadboard](/images/breadboard.jpg)

- 1 x Piezo buzzer
- 1 x 1-megaohm resistor
- 1 x Servo motor
- 1 x 100-microFarad capacitor
- 1 x Switch
- 1 x 10-kilohm resistor
- 3 x LEDs (red, yellow, green)
- 3 x 220-ohm resistors
- Many jumper wires

![parts](/images/arduino-projects-book-project-12/parts.jpg)

## **CIRCUIT LAYOUT:**

When connecting the buzzer, note that there may be **a plus(+) on one lead, indicating VCC**. We should connect that lead to **+5V** of the Arduino, and **the other lead through the 1-megaohm resistor to A0 and GND**. If both leads of the buzzer are the same, we can plug the buzzer in the breadboard either way.

Also, the **VCC** lead, the **PULSE** lead, and the **GND** lead should be connected to **+5V**, **a PWM pin** (in this case ~9), and **GND** of the Arduino, respectively. Because it draws a lot of currents when moving, we must connect a 100-microFarad parallel to the servo.

Here is my schematic:

![schematic](/images/arduino-projects-book-project-12/schematic.png)

And this is my breadboard layout:

![breadboard-layout](/images/arduino-projects-book-project-12/breadboard-layout.jpg)

![build](/images/arduino-projects-book-project-12/build.jpg)

## **CODE:**

We first encounter function in this project. Instead of writing our code repetitively, we will only write those lines of code once in a function and call that function over and over again. Functions are good for us because we are not only able to **reuse** the code but also make our **main code more readable**.

Here is the code: 

<?prettify?>
<pre class="prettyprint cpp-html linenums">
/**
 * Project Name: Arduino Projects Book - Project 12: Knock Lock
 *
 * File Name: knock_lock.ino
 *
 * Description: Uses the Piezo buzzer to make a secret locking mechanism in
 * order to keep intruders out.
 *
 * Author: Zhengqi Dong
 * Location:  
 * Created: September 06, 2016
 * Updated: June 22, 2017
 */

#include <span><</span>Servo.h<span>></span>

Servo ServoMotor;

// Required hardware I/O connections
const byte PIEZO_PIN      = A0; // the pin piezo buzzer connected to
const byte SWITCH_PIN     = 2;  // the pin switch connected to
const byte YELLOW_LED_PIN = 3;  // the pin yellow LED connected to
const byte GREEN_LED_PIN  = 4;  // the pin green LED connnected to
const byte RED_LED_PIN    = 5;  // the pin red LED connected to
const byte SERVO_PIN      = 9;  // the pin servo motor connected to

// Global constants
const unsigned short BAUD_RATE = 9600;
const byte QUIET_KNOCK_VAL     = 30;
const byte LOUD_KNOCK_VAL      = 50;
const byte MAX_NUM_KNOCK       = 5;

// Global variables
byte switch_val;
byte knock_val;
boolean is_locked  = false;
byte    num_knocks = 0;

void setup() {
    ServoMotor.attach(SERVO_PIN);
    pinMode(SWITCH_PIN,     INPUT);
    pinMode(YELLOW_LED_PIN, OUTPUT);
    pinMode(GREEN_LED_PIN,  OUTPUT);
    pinMode(RED_LED_PIN,    OUTPUT);
    Serial.begin(BAUD_RATE);
    // unlock the box first
    digitalWrite(GREEN_LED_PIN, HIGH);
    ServoMotor.write(0);
    Serial.println("ACCESS GRANTED");
}

void loop() {
    if (is_locked == false) {
        switch_val = digitalRead(SWITCH_PIN);

        if (switch_val == HIGH) {
            LockTheBox();
        }
    } else {
        knock_val = analogRead(PIEZO_PIN);

        // require MAX_NUM_KNOCK valid knocks
        if ((num_knocks < MAX_NUM_KNOCK) && (knock_val > 0)) {
            if (CheckForKnock(knock_val) == true) {
                num_knocks++;
            }
            Serial.print("Need ");
            Serial.print(MAX_NUM_KNOCK - num_knocks);
            Serial.println(" more knock(s)");
        }

        if (num_knocks >= MAX_NUM_KNOCK) {
            UnLockTheBox();
            // reset num_knocks
            num_knocks = 0;
        }
    }
}

/**
 * Changes the LEDs and turn the servo to unlock the box.
 */
void UnLockTheBox(void) {
    // change the is_locked value
    is_locked = false;
    // indicate on LEDs
    digitalWrite(RED_LED_PIN,   LOW);
    digitalWrite(GREEN_LED_PIN, HIGH);
    // rotate the servo to 0 degree
    ServoMotor.write(0);
    // print a message on the Serial Monitor
    Serial.println("ACCESS GRANTED");
    // allow time for the servo to completely move
    delay(20);
}

/**
 * Changes the LEDs and turn the servo to lock the box.
 */
void LockTheBox(void) {
    // change is_locked value
    is_locked = true;
    // indicate on LEDs
    digitalWrite(GREEN_LED_PIN, LOW);
    digitalWrite(RED_LED_PIN,   HIGH);
    // rotate the servo to 90 degrees
    ServoMotor.write(90); // rotate the servo 90 degrees to lock
    // print a message on the Serial Monitor
    Serial.println("ACCESS DENIED");
    // allow time for the servo to completely move
    delay(20);
}

/**
 * Checks to see if a knock is valid or not.
 *
 * @param   a_knock_val   the loudness of the knock
 *
 * @return                true if a valid knock, false otherwise
 */
boolean CheckForKnock(byte a_knock_val) {
    if ((a_knock_val > QUIET_KNOCK_VAL) && (a_knock_val < LOUD_KNOCK_VAL)) {
        digitalWrite(YELLOW_LED_PIN, HIGH);
        delay(50);
        digitalWrite(YELLOW_LED_PIN, LOW);
        Serial.print("Valid knock value: ");
        Serial.println(a_knock_val);
        return true;
    } else {
        Serial.print("Invalid knock value: ");
        Serial.println(a_knock_val);
        return false;
    }
}
</pre>

<!-- ## **USING:**

<div class="embedded-video">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/3qr2j-g_LdE?list=PLt_UZum7NVtmFEVMdv4XH8TgXzJvzd78x" frameborder="0" allowfullscreen></iframe>
</div> -->
