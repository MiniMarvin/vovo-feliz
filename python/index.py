from knotpy import KnotConnection
credentials = {
    'servername': 'knot-test.cesar.org.br',
    'port': 80,
    'uuid': 'f10eb36f-ddb9-463f-aa2e-0c2cf4830000',
    'token': 'da55ab6af6803ab3673f8730caacfb98a425593d'
}
conn = KnotConnection(credentials)
myThings = conn.getDevices()

print(myThings)