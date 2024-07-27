import board
import adafruit_bmp3xx
from digitalio import DigitalInOut

SPI = board.SPI()
CS = DigitalInOut(board.D25)
bmp = adafruit_bmp3xx.BMP3XX_SPI(SPI, CS)

