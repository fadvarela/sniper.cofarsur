using DataAccess.Access.Peticiones;
using DataAccess.Models.RRHH;
using DataAccess.Models.Sistema.Helper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.RRHH.Consultas
{
	public class NovedadBackend
	{
		NovedadDataAccess novedadDataAccess = new NovedadDataAccess();

		public IEnumerable<Novedad> GetNovedades(List<string> filtros)
		{
			return novedadDataAccess.GetNovedades(filtros);
		}

		public IEnumerable<CmbEntity> getListJornadas(long? filtro)
		{
			return novedadDataAccess.getListJornadas(filtro);
		}

		public IEnumerable<CmbEntity> getListIncidencias(List<string> filtros)
		{
			return novedadDataAccess.getListIncidencias(filtros);
		}

		public IEnumerable<Marcacion> getListMarcaciones(List<string> filtros)
		{
			return novedadDataAccess.getListMarcaciones(filtros);
		}
		
		/*-------------------------POST-----------------------------*/

		public ResponseHelper guardarJornada(List<string> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarJornada(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper guardarIncidencia(List<string> param)
		{
			var responseHelper = new ResponseHelper();
			responseHelper = novedadDataAccess.guardarIncidencia(param);
			if (!responseHelper.Ok)
			{
				responseHelper.Mensaje = "Hubo un problema al guardar los datos";
			}
			return responseHelper;
		}

		public ResponseHelper guardarMarcacion(List<string> param)
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
