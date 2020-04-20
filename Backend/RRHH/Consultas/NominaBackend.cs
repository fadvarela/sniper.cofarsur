using DataAccess.Access.Peticiones;
using DataAccess.Models.RRHH;
using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.RRHH.Consultas
{
	public class NominaBackend
	{
		NominaDataAccess nominaDataAccess = new NominaDataAccess();

		public IEnumerable<Nomina> GetNomina(long ID_LEGAJO)
		{
			return nominaDataAccess.GetNomina(ID_LEGAJO);
		}
	}
}
