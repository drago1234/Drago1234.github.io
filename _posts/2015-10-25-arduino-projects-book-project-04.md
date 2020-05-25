---
title: 'Arduino Projects Book - Project 04: Color Mixing Lamp'
date: '2015-10-25 23:07:26'
categories:
  - Arduino
tags:
  - arduino_uno
  - arduino_projects_book
  - breadboarding
  - led
  - sensor
excerpt: >-
  Welcome back! This is my 4th Project from the Arduino Projects Book. I learned
  a lot of new things from this project. This will be a colorful demonstration!
---

Welcome back! This is my 4th Project from the Arduino Projects Book. I learned a lot of new things from this project. This will be a colorful demonstration!

## **PREPARATION:**

- 1 x Arduino UNO

![arduino-uno](/images/arduino-uno.jpg)

- 1 x Breadboard

![breadboard](/images/breadboard.jpg)

- 3 x 220-ohm resistors
- 3 x 1-kilohm resistors
- 13 x Jumper wires
- 3 x Photocells
- 3 x Gels (red, green, blue)
- 1 x RGB LED

![parts](/images/arduino-projects-book-project-04/parts.jpg)

## **BUILDING THE CIRCUIT:**

Recall that **ANALOG** is about the real number, such as fractions, decimals, irrational number, etc. **DIGITAL** is about whole numbers or boolean values (`True` or `False`). For example, the wrist watch can be either an analog or a digital watch. An analog watch is a watch that indicates time by its hands (hour, minute, second). Those hands point to real values on the watch, and the wearers only estimate their values but cannot tell exactly where they are (nobody can tell correctly that it's 23:07:26.48 right now). On the other hand, a digital clock doesn't have hands but instead segments of lights on its screen to show numbers which tell the time. Generally, **ANALOG** represents real numbers, whereas **DIGITAL** represents whole numbers.

_Input_: Power will go through the photocells to **ANALOG**; it also goes through 10-kilohm resistors and then ends at GND. This is called a pull-down resistor configuration.

_Output_: There are some DIGITAL pins that have special functions? At pins ~3, ~5, ~6, ~9, ~10 and ~11 there is a `~` character beside each. It indicates that the noted pins have **PWM (Pulse Width Modulation)**. PWM is a special capability of DIGITAL pins to make them produce floating outputs. For example, pros can use PWM to fade LEDs. So, hook the each channel of the RGB LED into each PWM pin, in this case, ~9, ~10 and ~11. Don't forget to put a resistor for each channel!

**Important:** The longest leg of the RGB LED is the common ground (cathode). On the left of the cathode is Red. The first one on the right of the cathode is Blue and the last one is Green. Thus, the order of the legs will be **red -> common cathode -> blue -> green** although its name is *RGB LED*. Be careful!

Here is my schematic:

![schematic](/images/arduino-projects-book-project-04/schematic.png)

Here is my breadboard layout from [Fritzing](http://fritzing.org/home/):

![breadboard-layout](/images/arduino-projects-book-project-04/breadboard-layout.jpg)

Both are available on my [GitHub](https://github.com/philectron/pcb/tree/master/arduino_repo/color_mixing_lamp). This is my circuit:

![build](/images/arduino-projects-book-project-04/build.jpg)

## **THE CODE:**

Here is my full code. It is also available on my [GitHub](https://github.com/philectron/arduino/blob/master/color_mixing_lamp/color_mixing_lamp.ino).

<?prettify?>
<pre class="prettyprint cpp-html linenums">
/**
 * Project Name: Arduino Projects Book - Project 04: Color Mixing Lamp
 *
 * File Name: color_mixing_lamp.ino
 *
 * Description: Indicates different colors on the RGB LED
 * according to the amount of light each photocell receives.
 *
 * Author: Zhengqi Dong
 * Location:  
 */

// Required hardware I/O connections
const byte RED_SENSOR_PIN   = A0; // connect red sensor to A0
const byte GREEN_SENSOR_PIN = A1; // connect green sensor to A1
const byte BLUE_SENSOR_PIN  = A2; // connect blue sensor to A2
const byte GREEN_LED_PIN    = 9;  // connect green pin of the RGB LED to ~9
const byte BLUE_LED_PIN     = 10; // connect blue pin of the RGB LED to ~10
const byte RED_LED_PIN      = 11; // connect red pin of the RGB LED to ~11

// Global constants
const unsigned int BAUD_RATE = 9600;

// Global variables
unsigned int red_led_value      = 0;
unsigned int blue_led_value     = 0;
unsigned int green_led_value    = 0;
unsigned int red_sensor_value   = 0;
unsigned int blue_sensor_value  = 0;
unsigned int green_sensor_value = 0;

void setup() {
    Serial.begin(BAUD_RATE);
    pinMode(RED_LED_PIN,   OUTPUT);
    pinMode(BLUE_LED_PIN,  OUTPUT);
    pinMode(GREEN_LED_PIN, OUTPUT);
}

void loop() {
    // read the values from the sensors
    // leave 5 miliseconds for Analog - Digital Conversion
    red_sensor_value = analogRead(RED_SENSOR_PIN);
    delay(5);
    blue_sensor_value = analogRead(BLUE_SENSOR_PIN);
    delay(5);
    green_sensor_value = analogRead(GREEN_SENSOR_PIN);

    // print those values onto the serial monitor
    Serial.println("Raw Sensor Values:");
    Serial.print("\t Red: ");
    Serial.print(red_sensor_value);
    Serial.print("\t Blue: ");
    Serial.print(blue_sensor_value);
    Serial.print("\t Green: ");
    Serial.println(green_sensor_value);

    // convert from 0-1023 to 0-255
    red_led_value   = red_sensor_value / 4;   // define Red LED
    blue_led_value  = blue_sensor_value / 4;  // define Blue LED
    green_led_value = green_sensor_value / 4; // define Green LED

    // print mapped values to serial monitor
    Serial.println("Mapped Sensor Values:");
    Serial.print("\t Red: ");
    Serial.print(red_led_value);
    Serial.print("\t Blue: ");
    Serial.print(blue_led_value);
    Serial.print("\t Green: ");
    Serial.println(green_led_value);

    // use analogWrite() to set output for RGB LED
    analogWrite(RED_LED_PIN,   red_led_value);   // indicate red LED
    analogWrite(BLUE_LED_PIN,  blue_led_value);  // indicate blue LED
    analogWrite(GREEN_LED_PIN, green_led_value); // indicate green LED
}
</pre>

## **USING:**

Here's they way I use it. It looks interesting:

<div class="embedded-video">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/zwGk2Ztyj2o?list=PLt_UZum7NVtmFEVMdv4XH8TgXzJvzd78x" frameborder="0" allowfullscreen></iframe>
</div>

## **WRAP UP:**

From this project, I learned how the photocell works. I also learned how to change the color of the RGB LED using `analogWrite()`. The right mix of analog and digital is really powerful indeed.
