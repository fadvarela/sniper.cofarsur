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
		NovedadDataAccess NovedadDataAccess = new NovedadDataAccess();

		public IEnumerable<Novedad> GetNovedades(DateTime fecha)
		{
			return NovedadDataAccess.GetNovedades(fecha);
		}

		public IEnumerable<CmbEntity> getListJornadas(long? filtro)
		{
			return NovedadDataAccess.getListJornadas(filtro);
		}

		
	}
}
