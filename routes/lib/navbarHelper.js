function OptionLink(name, link, active) {
  this.name = name;
  this.href = link;
  this.active = active;
}

function Navbar() {
  this.options = [];
  this.addOption = function (name, link, active) {
    var classActive;
    if(active == false)
    {
      classActive = "";
    }
    else
    {
      classActive = "class=\"active\"";
    }
    var option = new OptionLink(name, link, classActive);
    this.options.push(option);
  }
}

module.exports = Navbar;