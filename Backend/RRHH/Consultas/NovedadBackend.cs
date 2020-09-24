using DataAccess.Access.Peticiones;
using DataAccess.Models.RRHH;
using DataAccess.Models.Sistema.Helper;
using System.Collections.Generic;

namespace Backend.RRHH.Consultas
{
	public class NovedadBackend
	{
		NovedadDataAccess novedadDataAccess = new NovedadDataAccess();

		public IEnumerable<Novedad> GetNovedades(ParamEntity<object> filtro)
		{
			return novedadDataAccess.GetNovedades(filtro);
		}

		public IEnumerable<CmbEntity<object>> getListJornadas(long? filtro)
		{
			return novedadDataAccess.getListJornadas(filtro);
		}

		public IEnumerable<CmbEntity<long>> getListIncidencias(List<string> filtros)
		{
			return novedadDataAccess.getListIncidencias(filtros);
		}

		public IEnumerable<CmbEntity<long>> getListPatologias(ParamEntity<object> filtros)
		{
			return novedadDataAccess.getListPatologias(filtros);
		}

		public IEnumerable<Marcacion> getListMarcaciones(ParamEntity<object> param)
		{
			return novedadDataAccess.getListMarcaciones(param);
		}

		public IEnumerable<JornadaHabitual> getListJornadasHabituales(ParamEntity<object> param)
		{
			return novedadDataAccess.getListJornadasHabituales(param);
		}

		public IEnumerable<CmbEntity<long>> getIncidenciasJustificaciones(ParamEntity<long> param)
		{
			return novedadDataAccess.getIncidenciasJustificaciones(param);
		}

		public IEnumerable<Nomina> getNominaGrilla(ParamEntity<object> param)
		{
			return novedadDataAccess.getNominaGrilla(param);
		}

		public IEnumerable<Justificacion> getJustificacionGrilla(ParamEntity<Justificacion> param)
		{
			return novedadDataAccess.getJustificacionGrilla(param);
		}

		public IEnumerable<Incidencia> getIncidenciasGrillaModal(ParamEntity<object> param)
		{
			return novedadDataAccess.getIncidenciasGrillaModal(param);
		}

		public IEnumerable<Aviso> getNovedadesAvisos(ParamEntity<object> param)
		{
			return novedadDataAccess.getNovedadesAvisos(param);
		}

		public IEnumerable<Vacacion> getVacacionesList(ParamEntity<Vacacion> param)
		{
			return novedadDataAccess.getVacacionesList(param);
		}

		public IEnumerable<Vacacion> getSaldosVacacionesList(ParamEntity<Vacacion> param)
		{
			return novedadDataAccess.getSaldosVacacionesList(param);
		}		

		/*-------------------------POST-----------------------------*/

		public ResponseHelper guardarJornada(ParamEntity<object> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarJornada(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper guardarIncidencia(ParamEntity<Novedad> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarIncidencia(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper guardarObservacionIncidencia(ParamEntity<Novedad> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarObservacionIncidencia(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper guardarPatologiaIncidencia(ParamEntity<dynamic> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarPatologiaIncidencia(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper anularMarcacion(ParamEntity<Marcacion> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.anularMarcacion(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper guardarMarcacion(ParamEntity<Marcacion> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarMarcacion(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper guardarJornadaHabitual(ParamEntity<JornadaHabitual> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarJornadaHabitual(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper updJustificacion(ParamEntity<Justificacion> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.updJustificacion(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper guardarAviso(ParamEntity<Aviso> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarAviso(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper anularAviso(ParamEntity<Aviso> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.anularAviso(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper updVacacion(ParamEntity<Vacacion> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.updVacacion(param);
			return responseHelper;
		}
		

	}
}
