---
title: 'Arduino Projects Book - Project 01: Get to Know Your Tools'
date: '2015-09-26 16:26:11'
categories:
  - Arduino
tags:
  - arduino_projects_book
  - arduino_uno
excerpt: >-
  This is my first project of this book. It’s all about the basic electrical
  theory, the breadboard, and components in series and parallel. It will take
  about 30 minutes to complete this project.
---

This is my first project of this book. It's all about the basic electrical theory, the breadboard, and components in series and parallel. It will take about 30 minutes to complete this project.

First, the book explains the concept of **Current, Voltage and Resistance** using an interesting example. The book also introduces the breadboard, which is a vital part in circuit prototyping. Second, it is important to know how to build a circuit. The following things are what I think essentially important:

## **POWER and GND:**

The power output of the Arduino is at the **POWER** zone. In the zone, there is one pin that pops out 3.3V and another pin that pops out 5V. In the Ground (**GND**) zone, two pins are used to ground wires. You must connect 3.3V or 5V (but not both) pin to a positive (+) rail of the breadboard's power bus and a GND to the negative (-) rail. As a result, the circuit will be closed, and there will be electricity running through all components between power and ground.

## **LEDs:**

First, "LED" stands for "light-emitting diode." An LED converts electrical energy into light energy. It has two legs, the longer leg is called **anode**, and we must connect it to the **POWER**. The other leg is shorter; it's called **cathode**, and we must connect it to the **GND**. But what to do when the two legs are at the same length? Look at the epoxy case (the part that covers the top of the LED), and look for the flat spot. The leg that is on the same side as the flat spot is the cathode. So, wiring up the LED to power and GND is done, isn't it? No. In contrast, the LED will blow up if we try to put it directly to the power. In order to wire it up properly, we will need...

## **RESISTORS:**

Resistors are used for resisting the flow of electrical energy. The current power is usually very big, and it's often constant, so we can't change it. However, the components only need a little amount of electrical energy. In this project, we will need a **220-ohm resistor** connecting in series with the LED to power the light correctly. But why 220 Ohms?

## **OHM'S LAW**

<p align="center">
  <b>I = V / R</b>
</p>

**I**: Current magnitude. Unit: ampere (**A**)

**V**: Voltage magnitude. Unit: volt (**V**)

**R**: Resistance. Unit: ohm (**Ω**)

Current, voltage, and resistance are all related by the formula above.

Back to the number 220 Ohms. The voltage which we are using is 5V. The maximum current we can safely use the LED is 23mA. So, the resistance needed will be,

<p align="center">
  <b>R = V / I = 5 / (23 x 10^-3) ≈ 220 Ω</b>
</p>

## **SERIES CIRCUIT AND PARALLEL CIRCUIT:**

**Series circuit** means the flow of electrical energy will go through the components one by one and go on one single path. Vice versa, the **parallel circuit** means the flow of electrical energy will be divided and go to different branches.

## **WRAP UP:**

This is the first project of this book. It's truly easy. Beginners like me (when I first learned this project) will encounter some difficulties when playing around with electrical components. I hope things went well and you didn't blow up any LEDs!
