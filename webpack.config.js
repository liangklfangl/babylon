module.exports = {
	module:{
       rules:[
          {

          	test:/\.md$/,
          	loaders:['./node_modules/babel-loader','./loaders/jsonml-loader?lang=jsx','./loaders/markdown-loader']
          	// loaders:['./node_modules/babel-loader','./loaders/babel-types-loader/jsonml-loader?lang=jsx','./loaders/markdown-loader'] 
          }
       ]
	}
}