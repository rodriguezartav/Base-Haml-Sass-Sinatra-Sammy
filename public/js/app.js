var store;
var clientes;
var productos;
var oportunidades;

	$(document).ready(function(){
		
		var app = $.sammy('#main', function() {
		this.use(Sammy.JSON);
		this.use(Sammy.Storage);    
		this.debug = true;
  
		this.bind('loadRemoteClientes', function() {
			var context = this;
			$('#main').append('loading Clientes.....');
				$.ajax({
					url: "/getClientes",
					context: document.body,
					success: function(data){context.trigger('saveRemoteClientes', {clientes: data});},
					error: function() {  context.trigger('loadLocalClientes'); }
			});
		});
		
		this.bind('saveRemoteClientes', function(e, data) {
			var context = this;
			store.set('clientes', data['clientes']);
			context.trigger('loadRemoteProductos');
		});
		
		this.bind('loadRemoteProductos', function() {
			var context = this;
			$('#main').append('loading Productos.....');
				$.ajax({
					url: "/getProductos",
					context: document.body,
					success: function(data){context.trigger('saveRemoteProductos', {productos: data});},
					error: function() {  context.trigger('loadLocalClientes'); }
			});
		});

		this.bind('saveRemoteProductos', function(e, data) {
			var context = this;
			store.set('productos', data['productos']);
			context.trigger('loadLocalClientes');
		});   

		this.bind('loadLocalClientes', function() {
			var context = this;
			clientes = store.get('clientes');
			context.trigger('loadLocalProductos');
		});
		
		this.bind('loadLocalProductos', function() {
			var context = this;
			productos = store.get('productos');
			context.trigger('loadLocalOportunidades');
		});
		
		this.bind('loadLocalOportunidades', function() {
			var context = this;
			oportunidades = store.get('oportunidades');
			if(clientes !=null || clientes != undefined ){
				this.redirect('#/dashboard');
			}
		});

		 this.get('#/dashboard', function() {
	      $('#main').append(clientes);
				$('#main').append(productos);
				$('#main').append(oportunidades);
	   });

		this.bind('run', function() {
			var context = this;
			store = new Sammy.Store({name: 'rodco-facturacion', element: 'body', type: 'local'});
			context.trigger('loadRemoteClientes');   
		});
	});
 
    app.run('#/');

});
