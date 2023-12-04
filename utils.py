import re
import subprocess


def get_mac_dict():
    result = {}
    pattern = re.compile(r'(\d+\.\d+\.\d+\.\d+)(?:.+ ){3}([\dabcdef:]+)')
    proc = subprocess.Popen(['ip', 'neigh', 'show'], stdout=subprocess.PIPE)
    ip_report = str(proc.communicate())[3:].replace('\\n', '\n')
    for match in pattern.finditer(str(ip_report)):
        result[match.group(1)] = match.group(2)
    return result