---
title: 'Arduino Projects Book - Project 11: Crystal Ball'
date: '2016-08-26 19:40:27'
categories:
  - Arduino
tags:
  - arduino_projects_book
  - arduino_uno
  - breadboarding
  - lcd
  - potentiometer
  - switch
excerpt: >-
  In this project, we will simulate how the crystal ball works. People say their
  wishes and shake the ball, then it will reveal the answer for the wish.
  Similarly, we will use the tilt switch as a crystal ball. However, we need one
  more thing to display the mysterious answer. Today, we will meet the liquid
  crystal display (LCD).
---

## **OVERVIEW:**

In this project, we will simulate how the crystal ball works. People say their wishes and shake the ball, then it will reveal the answer for the wish. Similarly, we will use the tilt switch as a crystal ball. However, we need one more thing to _display_ the mysterious answer. Today, we will meet the **liquid crystal display (LCD)**.

## **LCD:**

The LCD can be used to display alphanumeric characters. My LCD has **16 columns and 2 rows, numbering from 0 to 15 and 0 to 1, respectively**. There are 16 pins on the LCD circuit. To make it work, we have to connect them correctly. The following figure is a snippet of the [LCD data sheet](https://github.com/philectron/arduino/blob/master/data_sheets/JHD_JHD659_LCD.pdf).

![lcd-pins](/images/arduino-projects-book-project-11/lcd-pins.png)

From the interface of these pins, we can clearly see that:

1. Pin NO.1 **V<sub>ss</sub>** is GND, and so it must be connected to **GND**.

2. Pin NO.2 **V<sub>cc</sub>** (or **V<sub>dd</sub>**) is the power supply. We should connect it to **+5V** of the Arduino.

3. Pin NO.3 **V<sub>0</sub>** controls the **LCD's contrast**. In this project, we will connect V<sub>0</sub> to a rotary **potentiometer**.

4. Pin NO.4 **RS**, as the description says, is the **register selection**. If `RS = 0`, the LCD will use _instruction register_ . When `RS = 1`, the _data register_ will be activated. Because RS only has two values `0` and `1` and we want to use both, we will connect it to **a digital pin**.

5. Pin NO.5 **R/W** provides the selection between **Read** and **Write**. If `R/W = 0`, the LCD will only _write on the screen_. When `R/W = 1`, the LCD will _read from the screen_. Because **we only need to write** on the screen, we will connect **R/W straight to GND**.

6. Pin NO.6 **E**, aka **Enable signal**, and the **8-bit data I/O line**, pin NO.7 **D0** (or **DB0**) to pin NO.14 **D7** (or **DB7**), will be discussed later in the _CODE_ section.

7. Pin NO.15 **LEDA** (LED anode, or **LED+**) is the anode of the backlight system for the LCD and should be connected to **+5V**.

8. Pin NO.16 **LEDK** (LED cathode, or **LED-**) is the cathode of the backlight system for the LCD and should be connected to **GND**.

This is the LCD that I have in my kit:

![lcd](/images/arduino-projects-book-project-11/lcd.jpg)

## **PARTS:**

- 1 x Arduino UNO

![arduino-uno](/images/arduino-uno.jpg)

- 1 x Breadboard

![breadboard](/images/breadboard.jpg)

- 1 x Rotary potentiometer
- 1 x Tilt switch
- 1 x 10-kilohm resistor (for the tilt switch)
- 1 x 220-ohm resistor (for the LCD backlight)
- Many jumper wires

![parts](/images/arduino-projects-book-project-11/parts.jpg)

## **CIRCUIT:**

We won't connect DB0-DB3 to anything; this will be explained in the next section. Here is the schematic, but note that the pinout of the LCD is not always the same as the breadboard layout because schematics make the circuit connection as simple as possible.

![schematic](/images/arduino-projects-book-project-11/schematic.png)

This is the breadboard layout. It's a bit different from the schematic.

![breadboard-layout](/images/arduino-projects-book-project-11/breadboard-layout.jpg)

The schematic and the breadboard layout are available on [my GitHub](https://github.com/philectron/pcb/tree/master/arduino_repo/crystal_ball). It took me long enough to build the circuit. It's really complicated at the first look. But just focus on the connection of each pin, it became easier. The circuit looks really messy.

![build](/images/arduino-projects-book-project-11/build.jpg)

## **CODE:**

In this project, we will use a new library, `LiquidCrystal.h`. This library provides a full control of the LCD with simple one-line statements. Without it, we would have to code in the registers of the LCD, and that would be a nightmare for beginners like me. So, the first thing we have to do is to **include the library**,

<pre class="prettyprint c-html linenums:1">
#include <span><</span>LiquidCrystal.h<span>></span>
</pre>

Right after including, we must use a **constructor** to tell the compiler which pins of the LCD connect to which pins of the Arduino. There are many choices for the constructor, but I'll use the following syntax:

<pre class="prettyprint c-html linenums:1">
LiquidCrystal lcd(rs, enable, d4, d5, d6, d7);
</pre>

with all parameters indicating an Arduino pin connected to the corresponding pin on the LCD sub-circuit. Because we only need **RS, E, D4, D5, D6, and D7**, there is no reason we need to connect D0-D3. Other pins are necessary for powering and backlighting the LCD, so we need to connect them properly like the schematic.

Additionally, there are more simple one-line statements to control the LCD, such as `lcd.write`, `lcd.setCursor`, `lcd.print`, and `lcd.clear`. For more information, please visit [Arduino.org reference](http://www.arduino.org/learning/reference/LiquidCrystal).

One new statement I will introduce in this post is `switch()`. It's a conditional statement similar to the `if()` statement.

<?prettify?>
<pre class="prettyprint cpp-html linenums">
switch (variable) {
    case value_1:
        // statements;
        break;
    case value_2:
        // statements;
        break;
    case value_3:
        // statements;
        break;
    // as many cases as we want
    default:
        // statements;
        break;
}
</pre>

`switch()` is similar to `if()`, but it makes the code look when we need to branch the code by different conditions of the same variable. **It is important to put a** `break` **statement at the end of each case** in order to break of the `switch()` statement when `variable` falls into one of the values of the cases. If there is no `break` statement, the code will still fall into one of the cases, but it will continue executing the code of the cases after that. In most situations, it's not a good idea.

See below for my code, or [view it on my GitHub](https://github.com/philectron/arduino/blob/master/crystal_ball/crystal_ball.ino).

<?prettify?>
<pre class="prettyprint cpp-html linenums">
/**
 * Project Name: Arduino Projects Book - Project 11: Crystal Ball
 *
 * File Name: crystal_ball.ino
 *
 * Description: Uses the LCD to help "predict" the future when tilting the
 * tilt switch.
 *
 * Author: Zhengqi Dong
 * Location:  
 * Created: August 26, 2016
 * Updated: June 22, 2017
 */

#include <span><</span>LiquidCrystal.h<span>></span>

// Required hardware I/O connections
const byte LCD_D7     = 2;  // connect D7 of the LCD to 2
const byte LCD_D6     = 3;  // connect D6 of the LCD to ~3
const byte LCD_D5     = 4;  // connect D5 of the LCD to 4
const byte LCD_D4     = 5;  // connect D4 of the LCD to ~5
const byte LCD_E      = 11; // connect E of the LCD to ~11
const byte LCD_RS     = 12; // connect RS of the LCD to 12
const byte SWITCH_PIN = 6;  // connect the tilt switch to ~6

// LiquidCrystal(rs, enable, d4, d5, d6, d7)
LiquidCrystal Lcd(LCD_RS, LCD_E, LCD_D4, LCD_D5, LCD_D6, LCD_D7);

// Global constants
const byte LCD_WIDTH  = 16;
const byte LCD_HEIGHT = 2;

// Global variables
byte switch_val      = 0;
byte prev_switch_val = 0;
byte reply           = 0; // varies from 0 to 7

void setup() {
    Lcd.begin(LCD_WIDTH, LCD_HEIGHT);
    pinMode(SWITCH_PIN, INPUT);
    // intro message
    Lcd.setCursor(0, 0);
    Lcd.print("Ask the");
    Lcd.setCursor(0, 1);
    Lcd.print("Crystal Ball!");
}

void loop() {
    switch_val = digitalRead(SWITCH_PIN);

    if ((switch_val != prev_switch_val) && (switch_val == LOW)) {
        reply = random(8); // randomly choose 1 out of 8 anwers
        Lcd.clear();
        Lcd.setCursor(0, 0);
        Lcd.print("The ball says...");
        delay(1000);
        Lcd.setCursor(0, 1);

        switch (reply) {
            case 0:
                Lcd.print("Absolutely");
                break;
            case 1:
                Lcd.print("Probably");
                break;
            case 2:
                Lcd.print("Maybe");
                break;
            case 3:
                Lcd.print("Yep");
                break;
            case 4:
                Lcd.print("Unsure");
                break;
            case 5:
                Lcd.print("Foolish Question");
                break;
            case 6:
                Lcd.print("Who knows");
                break;
            case 7:
                Lcd.print("Impossible");
                break;
        }
    }
    prev_switch_val = switch_val;
}
</pre>

## **USING:**

<div class="embedded-video">
  <iframe width="720" height="405" src="https://www.youtube.com/embed/pernHdUUCUk?list=PLt_UZum7NVtmFEVMdv4XH8TgXzJvzd78x" frameborder="0" allowfullscreen></iframe>
</div>
