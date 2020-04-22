using DataAccess.Access.MySQL;
using DataAccess.Models.RRHH;
using DataAccess.Models.Sistema.Helper;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace DataAccess.Access.Peticiones
{
	public class NovedadDataAccess
	{
		MySQL_Access MAccess = new MySQL_Access();

		public IEnumerable<Novedad> GetNovedades(DateTime fecha)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_FECHA",Value = fecha}
			};
			var sqlQuery = "SP_NOVEDADES_GET";
			var result = MAccess.GetSavantList<MySqlConnection, Novedad>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}

		public IEnumerable<CmbEntity> getListJornadas(long? filtro)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_JORNADA",Value = filtro},
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA",Value = 1}
			};
			var sqlQuery = "SP_JORNADAS_GET";
			var result = MAccess.GetSavantList<MySqlConnection, CmbEntity>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}
		
	}
}
