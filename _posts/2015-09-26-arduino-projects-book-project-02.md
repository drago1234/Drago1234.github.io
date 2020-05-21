---
title: 'Arduino Projects Book - Project 02: Spaceship Interface'
date: '2015-09-26 17:06:46'
categories:
  - Arduino
tags:
  - arduino_projects_book
  - arduino_uno
  - breadboarding
excerpt: >-
  In this project, I learned about digital inputs and outputs and wrote my first
  Arduino program. It took me about 45 minutes to complete this project.
---

In this project, I learned about digital inputs and outputs and wrote my first Arduino program. It took me about 45 minutes to complete this project.

## **DIGITAL PINS:**

There is a **Digital (PWM~)** zone on the Arduino. In this project, we will use pin ~5, 4, ~3 and 2. Arduino digital pins can read only two states: `LOW` and `HIGH`. `LOW` means "there is no voltage on this pin," and `HIGH` means "There is voltage here." Setting a pin `LOW` means turning it off. Vice versa, setting a pin `HIGH` means turning it on.

## **BUILDING THE CIRCUIT:**

It's a bit complicated when I build the circuit without copy from the book. The book also recommends covering the breadboard. That's optional.

## **THE CODE:**

This is **the most important part of this project**. For me, coding is like transferring life into hardware. So, I will focus on this part.

Every Arduino program must have functions: `void setup()` and `void loop()`. `void setup()` runs only once, whereas `void loop()` runs repeatedly. Other important things are variables. Variables are names we give to places in the Arduino's memory so that we can keep track of what is happening. Variables' names must be **meaningful** and **simple**. For example, `checkNumber` is a meaningful variable, so the users are able to understand it only by looking at its name. However, the variable `x1` doesn't tell them exactly what it is.

In this section, we will learn about some built-in functions, such as `pinMode()`, `digitalRead()`, and `digitalWrite()`. The `pinMode()` function is used for setting up digital pins on the Arduino.

<p align="center"><font face="consolas"><b>pinMode(pin, state);</b></font></p>

`pin` is the address of the pin we want to have access, and `state` can be `OUTPUT` or `INPUT`. `OUTPUT` means popping out electrical energy, and `INPUT` means receiving electrical energy. Note that all programming terms here are **cAsE sEnSiTiVe**. Next, the `digitalRead()` function is a function that reads the pin for voltage.

<p align="center"><font face="consolas"><b>digitalRead(pin);</b></font></p>

If `pin` is `LOW`, the function will return `LOW`. Otherwise, it will return `HIGH`. Finally, `digitalWrite()` sets a pin to be `HIGH` or `LOW`.

<p align="center"><font face="consolas"><b>digitalWrite(pin, state);</b></font></p>

`digitalWrite()` writes the `state` into the selected `pin`. For example, `digitalWrite(LED_PIN, HIGH)` will turn on the LED.

Again, pay full attention to the **cAsE sEnSiTiViTy** in the code.

## **USE IT:**

When done with programming, verify the program and upload it to the Arduino. The Arduino will turn on the green LED if the switch is pressed. Those two LEDs will start blinking. Hardware always looks cooler when it contains software.

## **WRAP UP:**

Congratulations! You have created your first Arduino program (and got it working. I believe so).
