module.exports = function spellClassArrays(input){
    // spells classes and archetypes to arrays
    if(input.class)
    input.class = input.class.split(',');
    if(input.archetype)
    input.archetype = input.archetype.split(',');
    if(input.circles)
    input.circles = input.circles.split(',');
    if(input.domains)
    input.domains = input.domains.split(',');
    if(input.oaths)
    input.oaths = input.oaths.split(',');
    if(input.patrons)
    input.patrons = input.patrons.split(',');
    return input;
}