import threading
import RPi.GPIO as GPIO


class Configuration:
    def __init__(self):
        self.admin_pin = lambda: GPIO.input(21)
        # self.admin_pin = gpio.DigitalInputDevice(21, pull_up=True, bounce_time=0.5)

    @property
    def admin(self):
        return self.admin_pin()

