---
title: 'Arduino Projects Book - Project 03: Love-O-Meter'
date: '2015-09-30 23:17:24'
categories:
  - Arduino
tags:
  - arduino_uno
  - arduino_projects_book
  - breadboarding
  - led
  - sensor
excerpt: >-
  In this project, I will play around with the temperature sensor. I learned a lot of built-in functions through this project.
---

In this project, I will play around with the temperature sensor. I learned a lot of built-in functions through this project. So, let's prepare a cold hand and a warm hand for the sensor!

## **PREPARATION:**

- 1 x Arduino UNO

![arduino-uno](/images/arduino-uno.jpg)

- 1 x Breadboard

![breadboard](/images/breadboard.jpg)

- 8 x Jumper wires
- 3 x 220-ohm resistors
- 1 x Temperature sensor
- 3 x LEDs

![parts](/images/arduino-projects-book-project-03/parts.jpg)

## **BUILDING THE CIRCUIT:**

I used both **ANALOG** and **DIGITAL** in this project. I learned more about **ANALOG** and how to process it in Arduino IDE. Here is my schematic:

![schematic](/images/arduino-projects-book-project-03/schematic.png)

Below is my breadboard layout from [Fritzing](http://fritzing.org/home/):

![breadboard-layout](/images/arduino-projects-book-project-03/breadboard-layout.jpg)

Both of them are available on my [GitHub](https://github.com/philectron/pcb/tree/master/arduino_repo/love_o_meter). And here is my circuit. Again, the anode of the LED should be connected to a **DIGITAL** pin, _not_ the **POWER**:

![build](/images/arduino-projects-book-project-03/build.jpg)

## **THE CODE:**

There're several built-in functions in this project, but I will try my best to explain them in my own way. As always, pay attention to **cAsE sEnSiTiViTy**.

<p align="center"><font face="consolas"><b>Serial.begin(baud_rate);</b></font></p>

This function opens a connection between the Arduino and the computer with a defined speed, `baud_rate`. There're a lot of bit rates, such as 300, 600, 1200, 2400, 4800, 9600, 14400, 19200, 28800, 38400, 57600, or 115200\. I mostly use 9600 and 115200 as my baud rates.

<p align="center"><font face="consolas"><b>analogRead(pin);</b></font></p>

Similarly to `digitalRead(pin)`, `analogRead(pin)` will get the value from the particular pin number (from A0 to A5). However, this function will get the **value** of the pin, not just the **state** like `digitalRead()`. That means the value it reads in is a real number (float). The function's range is between 0 and 1023.

<p align="center"><font face="consolas"><b>Serial.print(variable);</b></font></p>

It prints the value of `variable` from the Arduino to the serial monitor. We can view this on the Arduino IDE using the combination `Ctrl + Shift + M`.

Here are some formulas from this lab. They interpret how the sensor works and relationship between the sensor and the voltage:

<p align="center"><font face="consolas"><b>float voltage = (sensorValue / 1024.0) * 5.0;</b></font></p>

Voltage is assigned a real value between 0V and 5V. Since the sensor will read a value between 0 and 1024, we need to divide it by 1024 to get the ratio (or how much of 1024 the sensor reads in) and then multiply by 5 to get how much of 5V the voltage is going to have.

<p align="center"><font face="consolas"><b>temperature = (voltage - 0.5) * 100.0;</b></font></p>

For this TMP36 temperature sensor, every 10mV equals 1 degree Celsius.

See below for my full code for this project, or view it on [GitHub](https://github.com/philectron/arduino/tree/master/love_o_meter/love_o_meter.ino).

<?prettify?>
<pre class="prettyprint cpp-html linenums">
/**
 * Project Name: Arduino Projects Book - Project 03: Love-O-Meter
 *
 * File Name: love_o_meter.ino
 *
 * Description: Uses the temperature sensor to test how hot you really are!
 *
 * Author: Phi Luu
 * Location: Portland, Oregon, United States
 * Created: September 30, 2015
 * Updated: June 22, 2017
 */

// Required hardware I/O connections
const byte SENSOR_PIN = A0; // connect TMP sensor to A0
const byte LED_1      = 2;  // connect LED 1 to 2
const byte LED_2      = 3;  // connect LED 2 to ~3
const byte LED_3      = 4;  // connect LED 3 to 4

// Global constants
const float BASE_TEMP = 20.0;

// Global variables
unsigned int sensor_val;

void setup() {
    Serial.begin(9600);

    for (byte pin = LED_1; pin <= LED_3; pin++) {
        pinMode(pin, OUTPUT);
        digitalWrite(pin, LOW);
    }
}

void loop() {
    // read & print temperature value
    sensor_val = analogRead(SENSOR_PIN);
    Serial.print("Sensor value: ");
    Serial.println(sensor_val);

    // map & print temperature value to voltage
    float voltage = (sensor_val / 1024.0) * 5.0;
    Serial.print("Volts: ");
    Serial.println(voltage);

    // from voltage, define temperature
    float temperature = (voltage - 0.5) * 100;
    Serial.print("Degrees C: ");
    Serial.println(temperature);
    Serial.println();

    // from temperature, indicate the LEDs
    if ((temperature >= BASE_TEMP)
            && (temperature < BASE_TEMP + 2)) {
        digitalWrite(LED_1, HIGH);
        digitalWrite(LED_2, HIGH); // level 1: all LEDs turned on
        digitalWrite(LED_3, HIGH);
    } else if (temperature < BASE_TEMP) {
        digitalWrite(LED_1, LOW);
        digitalWrite(LED_2, LOW); // level 0: all LEDs turned off
        digitalWrite(LED_3, LOW);
    } else if ((temperature >= BASE_TEMP + 2)
               && (temperature < BASE_TEMP + 4)) {
        digitalWrite(LED_1, HIGH);
        digitalWrite(LED_2, LOW); // level 2: LED_1 turned on, LEDs 2 & 3 turned off
        digitalWrite(LED_3, LOW);
    } else if ((temperature >= BASE_TEMP + 4)
               && (temperature < BASE_TEMP + 6)) {
        digitalWrite(LED_1, LOW);
        digitalWrite(LED_2, HIGH); // level 3: LED_2 turned on, LEDs 1 & 3 turned off
        digitalWrite(LED_3, LOW);
    } else {
        digitalWrite(LED_1, LOW);
        digitalWrite(LED_2, LOW); // level 4: LED 3 turned on, LEDs 1 & 2 turned off
        digitalWrite(LED_3, HIGH);
    }
}
</pre>

## **USING:**

Place the cold hand on the temperature sensor, then place the hot hand. There will be some magical changes in the LEDs.

<div class="embedded-video">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/B_oXmm7LXKk?list=PLt_UZum7NVtmFEVMdv4XH8TgXzJvzd78x" frameborder="0" allowfullscreen></iframe>
</div>

## **WRAP UP:**

Today I have learned a bunch of new commands and cool things about the temperature sensor. I'm very tired now. I need to sleep. Thanks for reading!
