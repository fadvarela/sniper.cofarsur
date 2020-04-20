using DataAccess.Access.Peticiones;
using DataAccess.Models.RRHH;
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
	}
}
