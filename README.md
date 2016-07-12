# flower-power
Tessel 1 code for monitoring ambient data.

The code is specific to my setup but it's short enough to be readable and easily changeable.

## Install

Run `npm i`

## Description

`climate.js` must be pushed on tessel. It reads data from sensors and sends it to a webtask every 10 minutes (no server involved).

Before running the code you must register your task with http://webtask.io and ammend the link in https://github.com/terebentina/flower-power/blob/webtask/climate.js#L36
Registration is a simple matter of installing the wt tool, confirming your email/phone and registering:
```
npm i -g wt-cli
wt init
wt create webtask.js
```

The climate module is connected on port `D` on tessel to keep it away from a heat source (tessel itself). Better connect the module via cables or a breadboard.

The moisture sensor (YL-38 and YL-69) starts powered off. When the time for reading comes, the sensor is powered on for 2 seconds, the data is read then it's powered off again. This is done to prevent corrosion of the sensor due to electrolisis. Even so, inverting the +/- cables on the sensor itself is recommended every week to prolong the life of the sensor further.

To be able to turn the moisture sensor on and off, its VIN pin is connected to a digital pin on the tessel (in the GPIO bank). A digital pin sends either a 0v when turned off or a 3.3v when turned on. 
The analog pin on the sensor is connected to an analog pin on tessel GPIO and used for actually reading the data.

The min and max values coming from the moisture sensor are hardcoded in `climate.js`. Read them by keeping the sensor in air and in water respectively.

The reading from the moisture sensor is converted into a percent value where 0 is totally dry and 100 is totally wet.

Good tessel 1 docs are:
https://github.com/tessel/hardware/blob/master/tessel-hardware-overview.md#gpio-bank
https://github.com/tessel/t1-docs/blob/master/hardware-api.md
