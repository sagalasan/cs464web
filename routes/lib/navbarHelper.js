function OptionLink(name, link, active) {
  this.name = name;
  this.href = link;
  this.active = active;
}

function NavbarHelper() {
  var options = new Options();

  this.setOptions = function (value) {
    if(value === "default")
    {
      options.addOption("Home", "/", false);
      options.addOption("Clients", "/clients", false);
      options.addOption("Employees", "/employees", false);
      options.addOption("About", "/about", false);
    }
  };

  this.setActive = function (value) {
    options.setActive(value);
  };

  this.getOptions = function () {
    return options.options;
  };
  
}

function Options()
{
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
  };
  
  this.setActive = function (value) {
    for(var i = 0; i < this.options.length; i++) {
      if(this.options[i].name === value)
      {
        this.options[i].active = "class=\"active\"";
      }
    }
  };}

module.exports = NavbarHelper;