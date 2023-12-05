admin_mac_file = 'admin_mac.txt'


def read_mac_file():
    try:
        with open(admin_mac_file, 'r') as f:
            return f.read().split('\n')
    except FileNotFoundError:
        return []


def is_admin(mac: str):
    mac_list = read_mac_file()
    if mac in mac_list:
        return True
    return False


def add_admin(mac: str):
    if not is_admin(mac):
        mac_list = read_mac_file()
        mac_list.append(mac)
        with open(admin_mac_file, 'w') as f:
            f.write('\n'.join(mac_list))
        return '1'
    return '0'


def remove_admin(mac: str):
    mac_list = read_mac_file()
    try:
        mac_list.remove(mac)
        with open(admin_mac_file, 'w') as f:
            f.writelines(mac_list)
        return '1'
    except ValueError:
        return '0'
