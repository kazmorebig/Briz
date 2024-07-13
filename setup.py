from setuptools import setup, find_packages
from os.path import join, dirname

setup(
    name='Briz flask server',
    version='0.1',
    packages=find_packages(),
    install_requires=[
        'Flask==3.0.3',
        'flask-sock==0.7.0',
        'flask-cors==4.0.1',
        'marshmallow==3.21.3',
        'RPi.GPIO==0.7.1',
        'pyserial==3.5',
        'smbus==1.1.post2'
    ]
)