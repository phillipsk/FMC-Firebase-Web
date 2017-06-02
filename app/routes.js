/**
 * Required -- path.js 'Path={version:"0.8.4"}'
 * @pathLink   https://github.com/mtrpcic/pathjs
 * Routes configuration
 *
 * In this file, you set up routes to your controllers and their actions.
 * different URLs.
 *
 * SwallowJs(tm) : SwallowJs Framework (http://docs.swallow.js)
 *
 * For full copyright and license information, please see the LICENSE.txt
 *
 * @link          http://docs.swallow.js SwallowJs(tm) Project
 * @package       routes.js
 * @since         SwallowJs(tm) v 0.2.9
 */

/**
 * add your route here
 */

/**
 * index.html
 * landing page. (This is the first page you see)
 */
Path.map("#/").to(function () {
    renderLayout('login', swallowJsContainer);
}).enter(clearPanel);



Path.map("#/dashboard").to(function () {

    //FirebaseService.findAll(params)

    var path = '/announcements/';
    FirebaseService.findAll({
        path: path,
        limit:2000
    }, function(data) {
        if(!data.error) {
            logMessage(data);
            renderLayout('dashboard', inner_body_container, data);
        } else {
            logMessage(data.error);
        }
    });

}).enter(clearPanel);

Path.map("#/add-content").to(function () {
    renderLayout('add_content', inner_body_container);
}).enter(clearPanel);



Path.map("#/about").to(function () {
    renderLayout('about', swallowJsContainer);
}).enter(clearPanel);


// Path.map("#/users/:user_id/:user_family").to(function () {
//     var data = {
//         user_id: this.params["user_id"],
//         user_family: this.params["user_family"],
//     };
//     renderLayout('users', swallowJsContainer, data);
// }).enter(clearPanel);


/**
 * This is a route with optional components.  Optional components in a route are contained
 *  within brackets.  The route below will match both "#/about" and "#/about/author".
 */
// Path.map("#/about(/author)").to(function(){
//
// });

