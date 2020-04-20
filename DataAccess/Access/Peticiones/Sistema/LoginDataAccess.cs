using DataAccess.Access.MySQL;
using DataAccess.Models.Sistema.Login;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace DataAccess.Access.Peticiones.Sistema
{
	public class LoginDataAccess
	{
		MySQL_Access MAccess = new MySQL_Access();

		public IEnumerable<Usuario> ValidarUsuario(string usuario, string pass, string cuit)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_USUARIO", Value = usuario, Direction=System.Data.ParameterDirection.Input},
				new MySqlParameter(){ ParameterName = "P_PASS", Value = pass, Direction=System.Data.ParameterDirection.Input},
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = 1, Direction=System.Data.ParameterDirection.Input}
			};
			var sqlQuery = "SP_VALIDARUSUARIO_GET";
			var result = MAccess.GetSavantList<MySqlConnection, Usuario>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}
	}
}
