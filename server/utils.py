def check_email(email):
    """检查邮箱"""
    if "@" not in email or "." not in email:
        return False
    not_in = " \n\t\033\a\b\f\r\v"
    for word in not_in:
        email = email.replace(word, "")
    eml_parts_list = []
    eml_parts_list += [email.split("@")[0]]
    eml_parts_list += [email.split("@")[1].split(".")[0]]
    eml_parts_list += [email.split("@")[1].split(".")[1]]
    print(eml_parts_list)
    for i in eml_parts_list:
        if not i:
            return False
    return True
