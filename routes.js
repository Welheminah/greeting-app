module.exports = function (theGreeting) {

    async function main(req, res) {

        try {
            const greetMessage = await theGreeting.message()

            const counting = await theGreeting.theCounter();

            res.render('index', {
                counter: counting,
                message: greetMessage
            });
        } catch (error) {
            console.log(error);
        }
    }

    async function mainPost(req, res) {

        try {
            const {
                name,
                language
            } = req.body;
            if (name === '' || language === null) {
                req.flash('error', 'Please enter the name and select the language');

            } else if (language === null) {
                req.flash('error', 'Please select the language');
            } else if (name === '') {
                req.flash('error', 'Please enter the name');
            } else {
                await theGreeting.weStorenames(name);
                await theGreeting.weGreetPeople(language, name);
            }


            res.redirect('/');
        } catch (error) {
            console.log(error)

        }
    }


    async function greetedNames(req, res) {
        try {
            const nameList = await theGreeting.getName();
            res.render('greeted', {
                names: nameList
            })
        } catch (error) {
            console.log(error)
        }

    }


    async function userCounter(req, res) {

        try {
            const name = req.params.name;
            const letsCount = await theGreeting.weStorenames(name)
            //  console.log(greet.weStorenames(name))
            res.render('greetedName', {
                name: letsCount.names,
                counter: letsCount.counter
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function resetData(req, res) {
        try {
            await theGreeting.resetCounter();
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }

    }

    async function flash(req, res) {
        try {
            const letsCheck = {
                'name': req.body.name,
                'language': req.body.language
            };
            if (letsCheck.name === '' || letsCheck.language === null) {
                req.flash('error', 'Please enter the name and select the language');
                res.redirect('/');
            } else if (language === null) {
                req.flash('error', 'Please select the language');
                res.redirect('/');

            }
        } catch (error) {
            console.log(error)
        }
    }

    return {
        main,
        mainPost,
        greetedNames,
        userCounter,
        resetData,
        flash
    }
}