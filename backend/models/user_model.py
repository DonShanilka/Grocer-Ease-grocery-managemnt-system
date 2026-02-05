class User:
    def __init__(self, id, username, email, password, role="user"):
        self.id = id
        self.username = username
        self.email = email
        self.password = password
        self.role = role

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role
        }
