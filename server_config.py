import threading
import RPi.GPIO as GPIO


class Configuration:
    def __init__(self):
        self.admin_pin = lambda: GPIO.input(21)
        # self.admin_pin = gpio.DigitalInputDevice(21, pull_up=True, bounce_time=0.5)
        GPIO.setup(23, GPIO.IN)
        self.laser_in_pin = lambda: GPIO.input(23)

    @property
    def admin(self):
        return self.admin_pin()

    @property
    def laser_in(self):
        return self.laser_in_pin()

config = Configuration()