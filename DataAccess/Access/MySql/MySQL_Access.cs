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
        
            
            // Ramiro Santillán te extraño
			// fer dice rami que no lo pases a produccion (lau)

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

                      if (parameters != null)
                      {
                          cmd.Parameters.AddRange(parameters.ToArray());
                          cmd.GetDbParameters();

                      }

                  }).Execute();

			return result;

        }










    }
}
