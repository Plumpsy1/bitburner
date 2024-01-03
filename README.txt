WHAT DO THE FILES DO
r_run         :re runs desired file ussualy either a_money or node.js
start.js      :runs a_money.js and node.js
┣a_money.js   :automatically identifies targets and then runs port.js and r_money.js on them
┃┣-port.js    :part of a_money.js automatically gives root access to the target
┃┗-r_money.js :part of a_money.js responsible for moving money.js and executing it on the correct target
┃   ┗money.js :hacks grows and weakens target forever
┣node.js      :automatically upgrades hacknet nodes


