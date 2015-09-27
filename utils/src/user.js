
function User() { // Either for password
    this.username = null;
}

User.prototype.setUsername = function(name) {
    this.username = Maybe.of(name);
};
User.prototype.getUsernameMaybe = function(f) {
    return this.username.map(f);
};
