const path = require('path')
const chalk = require('chalk')

module.exports = {
  binPath: path.resolve(__dirname),
  baseloopAsciiLogo: chalk`  {red ____}                 {green _}                   
 {red | __ )}  {cyan __ _} {magenta ___}  {yellow ___}{green | |} {red ___}   {blue ___}  {magenta _ __}  
 {red |  _ \\} {cyan / _\`} {magenta / __|}{yellow / _ \\} {green |}{red / _ \\} {blue / _ \\}{magenta | '_ \\} 
 {red | |_) |} {cyan (_|} {magenta \\__ \\}  {yellow __/} {green |} {red (_) |} {blue (_)} {magenta | |_) |}
 {red |____/} {cyan \\__,_}{magenta |___/}{yellow \\___|}{green _|}{red \\___/} {blue \\___/}{magenta | .__/} 
                                    {magenta |_|}`
}
