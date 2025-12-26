import shortuuid

def gen_id(n):
    uid = shortuuid.uuid()[:n]
    return uid
