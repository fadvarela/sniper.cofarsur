using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using DbConnector.Core;
using System.Data.Common;
using DataAccess.Models.Sistema;

namespace DataAccess.Access.MySQL
{
   public class MySQL_Access
    {

        private readonly string cadena = ConfigurationManager.ConnectionStrings["cadena"].ConnectionString.ToString();


		/*--------------MAXI-------------*/
		// Acá es donde vamos a hacer cosas que la cadena la toma de otra función que consulte la cadena de un archivo
		// el app config va a tener la cadena principal a la BD  de SNIPER
		// Aquí vamos a crear otro método que llene un objeto



		//  Método para convertir objetos
		public static dynamic Convertir(dynamic fuente, Type destino)
		{
			return Convert.ChangeType(fuente, destino);
		}

		/*--------------GET LIST-------------*/
		public IEnumerable<T> GetSavantList<TResult, T>(string sqlQuery, CommandType comandType, Type tipo, List<object> parameters = null)
                where TResult : DbConnection where T : new()
        {
            var _dbConnector = new DbConnector<TResult>(cadena);

            var result = _dbConnector.Read<T>(
                  onInit: (cmd) =>
                  {
                      cmd.CommandType = comandType;
                      cmd.CommandText = sqlQuery.ToUpper();
					  cmd.CommandTimeout = 5000; // seteamos el tiempo de espera de 5 minutos

					  if (parameters != null)
                      {
                          cmd.Parameters.AddRange(parameters.ToArray());
                          cmd.GetDbParameters();

                      }

                  }).Execute();

			return result;

        }

		/*--------------GET OBJECT-------------*/
		public T GetSavantObject<TResult, T>(string sqlQuery, CommandType comandType, Type tipo, List<object> parameters = null)
			where TResult : DbConnection where T : new()
		{
			// Creo el objeto de tipo DbConnector enviándole la cadena de conexión por parámetro
			var _dbConnector = new DbConnector<TResult>(cadena);

			// Funcion 'ReadFirstOrDefault' devuelve un objeto. Se especifica que tipo de objeto se va a mappear
			return _dbConnector.ReadFirstOrDefault<T>(
				onInit: (cmd) =>
				{
					//"SELECT id, titulo as nombre FROM test WHERE id = @id"
					cmd.CommandType = comandType; // Especifico el tipo de comando
					cmd.CommandText = sqlQuery.ToUpper(); // Seteo la query enviada por parámetro
					cmd.CommandTimeout = 5000; // seteamos el tiempo de espera de 5 minutos

					if (parameters != null)
					{
						// Agrego la lista de parámetros al comando
						cmd.Parameters.AddRange(parameters.ToArray());

						// Llamo a funcion para convertir los parametros al tipo especificado
						Convertir(cmd.GetDbParameters(), tipo);

					}

				}).Execute();
		}

		/*--------------INSERT/DELETE/UPDATE-------------*/
		public bool SavantLoad<TResult>(string sqlQuery, CommandType comandType, Type tipo, List<object> parameters = null)
			where TResult : DbConnection
		{
			// Creo el objeto de tipo DbConnector enviándole la cadena de conexión por parámetro
			var _dbConnector = new DbConnector<TResult>(cadena);

			return _dbConnector.NonQuery<bool>(
				onInit: (cmd) =>
				{
					cmd.CommandType = comandType; // Especifico el tipo de comando
					cmd.CommandText = sqlQuery.ToUpper(); // Seteo la query enviada por parámetro
					cmd.CommandTimeout = 5000; // seteamos el tiempo de espera de 5 minutos

					if (parameters != null)
					{
						// Agrego la lista de parámetros al comando
						cmd.Parameters.AddRange(parameters.ToArray());

						// Llamo a funcion para convertir los parametros al tipo especificado
						Convertir(cmd.GetDbParameters(), tipo);

					}
				})
				.OnCompleted((v) => true) // Devuelvo un true si se registró correctamente
				.Execute();
		}

		/*-----------------------------------------------------------------------------------------------------------------------*/

			   		 	  	  	   

	}
}
