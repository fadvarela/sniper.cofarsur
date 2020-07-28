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

		public IEnumerable<Novedad> GetNovedades(ParamEntity<object> filtros)
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

		public IEnumerable<CmbEntity<object>> getListJornadas(long? filtro)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_JORNADA",Value = filtro},
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA",Value = 1}
			};
			var sqlQuery = "SP_JORNADAS_GET";
			var result = MAccess.GetSavantList<MySqlConnection, CmbEntity<object>>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}
		public IEnumerable<CmbEntity<long>> getListIncidencias(List<string> filtros)
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
			var result = MAccess.GetSavantList<MySqlConnection, CmbEntity<long>>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}

		public IEnumerable<CmbEntity<long>> getListPatologias(ParamEntity<object> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA", Value = param.FechaDate },
				new MySqlParameter(){ ParameterName = "P_ID_PATOLOGIA", Value = param.IdPatologia }
			};

			var sqlQuery = "SP_PATOLOGIAS_GET";
			var result = MAccess.GetSavantList<MySqlConnection, CmbEntity<long>>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}
		

		public IEnumerable<Marcacion> getListMarcaciones(ParamEntity<object> param)
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

		public IEnumerable<JornadaHabitual> getListJornadasHabituales(ParamEntity<object> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO", Value = param.IdUsuario }
			};

			var sqlQuery = "SP_JORNADAS_HABITUALES_GET";
			var result = MAccess.GetSavantList<MySqlConnection, JornadaHabitual>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}

		public IEnumerable<CmbEntity<long>> getIncidenciasJustificaciones(ParamEntity<long> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_INCIDENCIA", Value = param.IdIncidencia},
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO", Value = param.IdUsuario }
			};

			var sqlQuery = "SP_JUSTIF_INCIDENCIAS_GET";
			var result = MAccess.GetSavantList<MySqlConnection, CmbEntity<long>>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}

		public IEnumerable<Nomina> getNominaGrilla(ParamEntity<object> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO", Value = param.IdUsuario },
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_TIPO", Value = param.Tipo}
			};

			var sqlQuery = "SP_NOMINA_GET";
			var result = MAccess.GetSavantList<MySqlConnection, Nomina>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}

		public IEnumerable<Justificacion> getJustificacionGrilla(ParamEntity<Justificacion> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO", Value = param.IdUsuario },
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa}
			};

			var sqlQuery = "SP_JUSTIF_GET";
			var result = MAccess.GetSavantList<MySqlConnection, Justificacion>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}

		public IEnumerable<Incidencia> getIncidenciasGrillaModal(ParamEntity<object> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA", Value = param.FechaDate },
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa}
			};

			var sqlQuery = "SP_NOV_INCIDENCIAS_GET";
			var result = MAccess.GetSavantList<MySqlConnection, Incidencia>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return result;
		}

		/*-----------------------------POST----------------------------------*/

		public ResponseHelper guardarJornada(ParamEntity<object> param)
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

		public ResponseHelper guardarIncidencia(ParamEntity<Novedad> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA", Value = param.FechaDateArray[0].Date },
				new MySqlParameter(){ ParameterName = "P_ID_INCIDENCIA",Value = param.IdIncidencia },
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO",Value = param.IdUsuario }
			};

			var sqlQuery = "SP_NOVEDADES_INCIDENCIAS_UPD";
			var responseHelper = new ResponseHelper();
			responseHelper.Ok = MAccess.SavantLoad<MySqlConnection>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return responseHelper;
		}

		public ResponseHelper guardarObservacionIncidencia(ParamEntity<Novedad> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA", Value = param.FechaDate.Date },
				new MySqlParameter(){ ParameterName = "P_ID_INCIDENCIA",Value = param.IdIncidencia },
				new MySqlParameter(){ ParameterName = "P_OBSERVACIONES",Value = param.GenericEntity.Observaciones }
			};

			var sqlQuery = "SP_NOV_OBSERVACIONES_UPD";
			var responseHelper = new ResponseHelper();
			responseHelper.Ok = MAccess.SavantLoad<MySqlConnection>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return responseHelper;
		}

		public ResponseHelper guardarPatologiaIncidencia(ParamEntity<dynamic> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA_DESDE", Value = param.FechaDateArray[0].Date },
				new MySqlParameter(){ ParameterName = "P_FECHA_HASTA", Value = param.FechaDateArray[1].Date },
				new MySqlParameter(){ ParameterName = "P_ID_PATOLOGIA",Value = param.IdPatologia },
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO",Value = param.IdUsuario }
			};

			var sqlQuery = "SP_PATOLOGIAS_UPD";
			var responseHelper = new ResponseHelper();
			responseHelper.Ok = MAccess.SavantLoad<MySqlConnection>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return responseHelper;
		}
		

		public ResponseHelper anularMarcacion(ParamEntity<Marcacion> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA_HORA", Value = param.GenericEntity.Hora},
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO",Value = param.IdUsuario },
				new MySqlParameter(){ ParameterName = "P_ID_MARCACION_FUENTE",Value = param.GenericEntity.IdMarcacionFuente },
				new MySqlParameter(){ ParameterName = "P_ID_MARCACION_TIPO",Value = param.GenericEntity.IdMarcacionTipo },
				new MySqlParameter(){ ParameterName = "P_ID_ESTADO",Value = param.GenericEntity.IdEstado },
				new MySqlParameter(){ ParameterName = "P_ID_INCIDENCIA",Value = param.GenericEntity.IdIncidencia },
				new MySqlParameter(){ ParameterName = "P_ID_MARCACION",Value = param.GenericEntity.IdMarcacion }
			};

			var sqlQuery = "SP_NOVEDADES_MARCACION_UPD";
			var responseHelper = new ResponseHelper();
			responseHelper.Ok = MAccess.SavantLoad<MySqlConnection>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return responseHelper;
		}

		public ResponseHelper guardarMarcacion(ParamEntity<Marcacion> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa},
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA_HORA", Value = Conversor.getDateTimeConcatenate(param.FechaDate.ToString("dd/MM/yyyy"), param.GenericEntity.Hora) },
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO",Value = param.IdUsuario },
				new MySqlParameter(){ ParameterName = "P_ID_MARCACION_FUENTE",Value = param.GenericEntity.IdMarcacionFuente },
				new MySqlParameter(){ ParameterName = "P_ID_MARCACION_TIPO",Value = param.GenericEntity.IdMarcacionTipo },
				new MySqlParameter(){ ParameterName = "P_ID_ESTADO",Value = param.GenericEntity.IdEstado },
				new MySqlParameter(){ ParameterName = "P_ID_INCIDENCIA",Value = param.GenericEntity.IdIncidencia },
				new MySqlParameter(){ ParameterName = "P_ID_MARCACION",Value = param.GenericEntity.IdMarcacion }
			};

			var sqlQuery = "SP_NOVEDADES_MARCACION_UPD";
			var responseHelper = new ResponseHelper();
			responseHelper.Ok = MAccess.SavantLoad<MySqlConnection>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return responseHelper;
		}

		public ResponseHelper guardarJornadaHabitual(ParamEntity<JornadaHabitual> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa },
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO", Value = param.IdUsuario },
				new MySqlParameter(){ ParameterName = "P_ID_JORNADA_LUNES", Value = param.GenericEntity.IdJlunes},
				new MySqlParameter(){ ParameterName = "P_ID_JORNADA_MARTES", Value = param.GenericEntity.IdJmartes},
				new MySqlParameter(){ ParameterName = "P_ID_JORNADA_MIERCOLES", Value = param.GenericEntity.IdJmiercoles},
				new MySqlParameter(){ ParameterName = "P_ID_JORNADA_JUEVES", Value = param.GenericEntity.IdJjueves},
				new MySqlParameter(){ ParameterName = "P_ID_JORNADA_VIERNES", Value = param.GenericEntity.IdJviernes},
				new MySqlParameter(){ ParameterName = "P_ID_JORNADA_SABADO", Value = param.GenericEntity.IdJsabado},
				new MySqlParameter(){ ParameterName = "P_ID_JORNADA_DOMINGO", Value = param.GenericEntity.IdJdomingo}
			};

			var sqlQuery = "SP_JORNADAS_HABITUALES_UPD";
			var responseHelper = new ResponseHelper();
			responseHelper.Ok = MAccess.SavantLoad<MySqlConnection>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return responseHelper;
		}

		public ResponseHelper updJustificacion(ParamEntity<Justificacion> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa },
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO", Value = param.IdUsuario },
				new MySqlParameter(){ ParameterName = "P_FECHA_DESDE", Value = param.GenericEntity.FechaDesde },
				new MySqlParameter(){ ParameterName = "P_DIAS", Value = param.GenericEntity.Dias },
				new MySqlParameter(){ ParameterName = "P_OBSERVACIONES", Value = param.GenericEntity.Observaciones },
				new MySqlParameter(){ ParameterName = "P_ID_JUSTIFICACION", Value = param.GenericEntity.IdJustificacion },
				new MySqlParameter(){ ParameterName = "P_ID_ESTADO", Value = param.GenericEntity.IdEstado },
				new MySqlParameter(){ ParameterName = "P_ID_INCIDENCIA", Value = param.GenericEntity.IdIncidencia }
			};

			var sqlQuery = "SP_JUSTIF_UPD";
			var responseHelper = new ResponseHelper();
			responseHelper.Ok = MAccess.SavantLoad<MySqlConnection>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return responseHelper;
		}

		public ResponseHelper guardarAviso(ParamEntity<Aviso> param)
		{
			var parametros = new List<object>()
			{
				new MySqlParameter(){ ParameterName = "P_ID_EMPRESA", Value = param.IdEmpresa },
				new MySqlParameter(){ ParameterName = "P_ID_USUARIO", Value = param.IdUsuario },
				new MySqlParameter(){ ParameterName = "P_ID_LEGAJO", Value = param.IdLegajo},
				new MySqlParameter(){ ParameterName = "P_FECHA_DESDE", Value = param.GenericEntity.FechaDesde },
				new MySqlParameter(){ ParameterName = "P_DIAS", Value = param.GenericEntity.Dias },
				new MySqlParameter(){ ParameterName = "P_OBSERVACIONES", Value = param.GenericEntity.Observaciones },
				new MySqlParameter(){ ParameterName = "P_ID_AVISO", Value = param.GenericEntity.IdAviso },
				new MySqlParameter(){ ParameterName = "P_ID_ESTADO", Value = param.GenericEntity.IdEstado },
				new MySqlParameter(){ ParameterName = "P_ID_INCIDENCIA", Value = param.GenericEntity.IdIncidencia },
				new MySqlParameter(){ ParameterName = "P_ID_PATOLOGIA", Value = param.GenericEntity.IdPatologia }
			};

			var sqlQuery = "SP_NOV_AVISOS_PRD_UPD";
			var responseHelper = new ResponseHelper();
			responseHelper.Ok = MAccess.SavantLoad<MySqlConnection>(sqlQuery, CommandType.StoredProcedure, typeof(MySqlParameterCollection), parametros);

			return responseHelper;
		}
		


	}
}
