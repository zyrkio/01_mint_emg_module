input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    Signal_Channel += 1
    if (lastChannelState == 1 || Signal_Channel == 1) {
        lastChannelState = 0
        Signal_Channel = 1
        basic.showLeds(`
            . . # . .
            . # # . .
            . . # . .
            . . # . .
            . # # # .
            `)
    } else if (Signal_Channel == 2) {
        basic.showLeds(`
            . # # # .
            . . . # .
            . # # # .
            . # . . .
            . # # # .
            `)
    } else if (Signal_Channel == 3) {
        basic.showLeds(`
            . # # # .
            . . . # .
            . # # # .
            . . . # .
            . # # # .
            `)
    } else if (Signal_Channel == 4) {
        basic.showLeds(`
            . # . # .
            . # . # .
            . # # # .
            . . . # .
            . . . # .
            `)
    } else if (Signal_Channel == 5) {
        basic.showLeds(`
            . # # # .
            . # . . .
            . # # # .
            . . . # .
            . # # # .
            `)
    } else if (Signal_Channel == 6) {
        basic.showLeds(`
            . # # # .
            . . . # .
            . # # # .
            . # . # .
            . # # # .
            `)
    } else if (Signal_Channel == 7) {
        basic.showLeds(`
            . # # # .
            . . . # .
            . . . # .
            . . . # .
            . . . # .
            `)
    } else if (Signal_Channel == 8) {
        basic.showLeds(`
            . # # # .
            . # . # .
            . # # # .
            . # . # .
            . # # # .
            `)
    } else if (Signal_Channel == 9) {
        basic.showLeds(`
            . # # # .
            . # . # .
            . # # # .
            . . . # .
            . # # # .
            `)
    }
    if (Signal_Channel == 10) {
        basic.showLeds(`
            # . . # .
            # . # . #
            # . # . #
            # . # . #
            # . . # .
            `)
    } else if (Signal_Channel == 11) {
        basic.showLeds(`
            # . . # .
            # . . # .
            # . . # .
            # . . # .
            # . . # .
            `)
    } else if (Signal_Channel == 12) {
        basic.showLeds(`
            # . # # #
            # . . . #
            # . # # #
            # . # . .
            # . # # #
            `)
    } else if (Signal_Channel == 13) {
        basic.showLeds(`
            # . # # #
            # . . . #
            # . # # #
            # . . . #
            # . # # #
            `)
    } else if (Signal_Channel == 14) {
        basic.showLeds(`
            # . # . #
            # . # . #
            # . # # #
            # . . . #
            # . . . #
            `)
    } else if (Signal_Channel == 15) {
        basic.showLeds(`
            # . # # #
            # . # . .
            # . # # #
            # . . . #
            # . # # #
            `)
    } else if (Signal_Channel == 16) {
        basic.showLeds(`
            # . # # #
            # . # . .
            # . # # #
            # . # . #
            # . # # #
            `)
    } else if (Signal_Channel == 17) {
        basic.showLeds(`
            # . # # #
            # . . . #
            # . . . #
            # . . . #
            # . . . #
            `)
    } else if (Signal_Channel == 18) {
        basic.showLeds(`
            # . # # #
            # . # . #
            # . # # #
            # . # . #
            # . # # #
            `)
    } else if (Signal_Channel == 19) {
        basic.showLeds(`
            # . # # #
            # . # . #
            # . # # #
            # . . . #
            # . # # #
            `)
    } else if (Signal_Channel == 20) {
        lastChannelState = 1
        basic.showLeds(`
            # # . # .
            . # # . #
            # # # . #
            # . # . #
            # # . # .
            `)
    }
    radio.setGroup(Signal_Channel)
})
let Mittelwert = 0
let processedSig = 0
let EMGSIGNAL = 0
let lastChannelState = 0
let Signal_Channel = 0
Signal_Channel = 1
basic.showString("" + (Signal_Channel))
radio.setGroup(Signal_Channel)
basic.forever(function () {
    radio.setGroup(Signal_Channel)
    EMGSIGNAL = pins.analogReadPin(AnalogPin.P0)
    processedSig = EMGConversion.convertFilterRectifyAndCalculateRMS(EMGSIGNAL)
    if (input.buttonIsPressed(Button.A)) {
        Mittelwert = ThresholdCalculator.calculateThreshold(processedSig, "")
    } else if (input.buttonIsPressed(Button.B)) {
        Mittelwert = ThresholdCalculator.calculateThreshold(0, "reset")
    } else if (Mittelwert < processedSig) {
        radio.sendValue("emg", 1)
    } else {
        radio.sendValue("emg", 0)
    }
    serial.writeValue("new Sgnal", processedSig)
    serial.writeValue("Mittelwert", Mittelwert)
    serial.writeValue("RAW", EMGSIGNAL)
    basic.pause(100)
})
