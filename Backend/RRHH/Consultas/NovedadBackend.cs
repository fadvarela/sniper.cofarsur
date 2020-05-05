using DataAccess.Access.Peticiones;
using DataAccess.Models.RRHH;
using DataAccess.Models.Sistema.Helper;
using System.Collections.Generic;

namespace Backend.RRHH.Consultas
{
	public class NovedadBackend
	{
		NovedadDataAccess novedadDataAccess = new NovedadDataAccess();

		public IEnumerable<Novedad> GetNovedades(ParamEntity filtro)
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

		public IEnumerable<Marcacion> getListMarcaciones(ParamEntity param)
		{
			return novedadDataAccess.getListMarcaciones(param);
		}

		/*-------------------------POST-----------------------------*/

		public ResponseHelper guardarJornada(ParamEntity param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarJornada(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper guardarIncidencia(ParamEntity param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarIncidencia(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper anularMarcacion(ParamEntity param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.anularMarcacion(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper guardarMarcacion(ParamEntity param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarMarcacion(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}



	}
}
