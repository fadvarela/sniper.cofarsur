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

		public IEnumerable<CmbEntity> getListJornadas(long? filtro)
		{
			return novedadDataAccess.getListJornadas(filtro);
		}

		public IEnumerable<CmbEntity> getListIncidencias(List<string> filtros)
		{
			return novedadDataAccess.getListIncidencias(filtros);
		}

		public IEnumerable<Marcacion> getListMarcaciones(ParamEntity<object> param)
		{
			return novedadDataAccess.getListMarcaciones(param);
		}

		public IEnumerable<JornadaHabitual> getListJornadasHabituales(ParamEntity<object> param)
		{
			return novedadDataAccess.getListJornadasHabituales(param);
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

		public ResponseHelper guardarIncidencia(ParamEntity<object> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarIncidencia(param);
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

	}
}
