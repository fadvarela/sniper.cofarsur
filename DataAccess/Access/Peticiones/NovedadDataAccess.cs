using DataAccess.Access.MySQL;
using DataAccess.Models.RRHH;
using DataAccess.Models.Sistema.Helper;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;

namespace DataAccess.Access.Peticiones
{
	public class NovedadDataAccess
	{
		MySQL_Access MAccess = new MySQL_Access();

		public IEnumerable<Novedad> GetNovedades(ParamEntity filtros)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_FECHA", Value = filtros.FechaDate },
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO", Value = filtros.IdUsuario },
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = filtros.IdEmpresa }
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
		public IEnumerable<CmbEntity> getListIncidencias(List<string> filtros)
		{
			var paramNames = new[] { "P_ID_INCIDENCIA", "P_ID_USUARIO", "P_ID_EMPRESA" };
			var parametros = new List<object>();

			for (int i = 0; i < paramNames.Length; i++)
			{
				parametros.Add(new MySqlParameter()
				{
					ParameterName = paramNames[i],
					Value = (filtros[i] != null) ? filtros[i] : null
				});
			}

			var sqlQuery = "SP_INCIDENCIAS_GET";
			var result = MAccess.GetSavantList<MySqlConnection, CmbEntity>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}

		public IEnumerable<Marcacion> getListMarcaciones(ParamEntity param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA", Value = param.FechaDate }
			};

			var sqlQuery = "SP_MARCACIONES_GET";
			var result = MAccess.GetSavantList<MySqlConnection, Marcacion>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}

		public ResponseHelper guardarJornada(ParamEntity param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA", Value = param.FechaDate.Date},
				new MySqlParameter(){ ParameterName = "P_ID_JORNADA",Value = param.IdJornada },
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO",Value = param.IdUsuario }
			};

			var sqlQuery = "SP_NOVEDADES_JORNADAS_UPD";
			var responseHelper = new ResponseHelper();
			responseHelper.Ok = MAccess.SavantLoad<MySqlConnection>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return responseHelper;
		}

		public ResponseHelper guardarIncidencia(ParamEntity param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA", Value = param.FechaDate.Date },
				new MySqlParameter(){ ParameterName = "P_ID_INCIDENCIA",Value = param.IdIncidencia },
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO",Value = param.IdUsuario }
			};

			var sqlQuery = "SP_NOVEDADES_INCIDENCIAS_UPD";
			var responseHelper = new ResponseHelper();
			responseHelper.Ok = MAccess.SavantLoad<MySqlConnection>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return responseHelper;
		}

		public ResponseHelper anularMarcacion(ParamEntity param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA_HORA", Value = param.MarcacionEntity.Hora},
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO",Value = param.IdUsuario },
				new MySqlParameter(){ ParameterName = "P_ID_MARCACION_FUENTE",Value = param.MarcacionEntity.IdMarcacionFuente },
				new MySqlParameter(){ ParameterName = "P_ID_MARCACION_TIPO",Value = param.MarcacionEntity.IdMarcacionTipo },
				new MySqlParameter(){ ParameterName = "P_ID_ESTADO",Value = param.MarcacionEntity.IdEstado },
				new MySqlParameter(){ ParameterName = "P_ID_INCIDENCIA",Value = param.MarcacionEntity.IdIncidencia },
				new MySqlParameter(){ ParameterName = "P_ID_MARCACION",Value = param.MarcacionEntity.IdMarcacion }
			};

			var sqlQuery = "SP_NOVEDADES_MARCACION_UPD";
			var responseHelper = new ResponseHelper();
			responseHelper.Ok = MAccess.SavantLoad<MySqlConnection>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return responseHelper;
		}

		public ResponseHelper guardarMarcacion(ParamEntity param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA_HORA", Value = Conversor.getDateTimeConcatenate(param.FechaDate.ToString("dd/MM/yyyy"), param.MarcacionEntity.Hora) },
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO",Value = param.IdUsuario },
				new MySqlParameter(){ ParameterName = "P_ID_MARCACION_FUENTE",Value = param.MarcacionEntity.IdMarcacionFuente },
				new MySqlParameter(){ ParameterName = "P_ID_MARCACION_TIPO",Value = param.MarcacionEntity.IdMarcacionTipo },
				new MySqlParameter(){ ParameterName = "P_ID_ESTADO",Value = param.MarcacionEntity.IdEstado },
				new MySqlParameter(){ ParameterName = "P_ID_INCIDENCIA",Value = param.MarcacionEntity.IdIncidencia },
				new MySqlParameter(){ ParameterName = "P_ID_MARCACION",Value = param.MarcacionEntity.IdMarcacion }
			};

			var sqlQuery = "SP_NOVEDADES_MARCACION_UPD";
			var responseHelper = new ResponseHelper();
			responseHelper.Ok = MAccess.SavantLoad<MySqlConnection>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return responseHelper;
		}






	}
}
