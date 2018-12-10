from knotpy import KnotConnection
credentials = {
    'servername': 'knot-test.cesar.org.br',
    'port': 3000,
    'uuid': 'bf3aed9f-c52e-4bc5-9021-f5065acc0000',
    'token': '0bd12a4c31de141909c3dd955d6b881d5ca5fa5b'
}
conn = KnotConnection(credentials)
myThings = conn.getDevices()