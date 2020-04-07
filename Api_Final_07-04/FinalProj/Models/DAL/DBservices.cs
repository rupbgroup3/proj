using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Web.Configuration;
using System.Data;
using System.Text;
using FinalProject.Models;
using FinalProj.Models;

/// <summary>
/// DBServices is a class created by me to provides some DataBase Services
/// </summary>
public class DBservices
{
    public SqlDataAdapter da;
    public DataTable dt;

    public DBservices()
    {
        //
        // TODO: Add constructor logic here
        //
    }
    //--------------------------------------------------------------------------------------------------
    // This method creates a connection to the database according to the connectionString name in the web.config 
    //--------------------------------------------------------------------------------------------------
    public SqlConnection connect(String conString)
    {

        // read the connection string from the configuration file
        string cStr = WebConfigurationManager.ConnectionStrings[conString].ConnectionString;
        SqlConnection con = new SqlConnection(cStr);
        con.Open();
        return con;
    }

    //--------------------------------------------------------------------------------------------------
    // These methods are to Person 
    //--------------------------------------------------------------------------------------------------
    public List<Person> getPersons()
    {
        List<Person> personList = new List<Person>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Person WHERE Email IS NOT NULL";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Person p = new Person();

                p.EmpFirstName = (string)dr["EmpFirstName"];
                p.EmpLastName = (string)dr["EmpLastName"];
                p.CellPhone = (int)dr["cellPhone"];
                p.Email = (string)dr["Email"];
                p.DepartmnetDepartmentCode = (int)dr["DepartmnetDepartmentCode"];
                p.EmpCode = (int)dr["EmpCode"];
                p.IsActive = Convert.ToBoolean(dr["IsActive"]);
                p.StudyingStartyear = (int)dr["StudyingStartyear"];
                p.ActiveTillYear = (int)dr["ActiveTillYear"];
                p.IsEmployee = (bool)dr["ISEMPLOYEE"];




                personList.Add(p);
            }

            //return personList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }


        return personList;

    }
    public int insertPerson(Person person)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertToPersonCommand(person);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------
    // Build the Insert command String
    //--------------------------------------------------------------------
    private String BuildInsertToPersonCommand(Person person)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
      
   
    
    sb.AppendFormat("Values('{0}', '{1}' ,{2}, '{3}',{4},'{5}', '{6}' ,'{7}', '{8}')", person.EmpFirstName, person.EmpLastName, person.CellPhone, person.Email, person.DepartmnetDepartmentCode,person.IsActive,person.ActiveTillYear,person.StudyingStartyear,person.IsEmployee);
        String prefix = "INSERT INTO Person" + "(EmpFirstName, EmpLastName, cellPhone, Email, DepartmnetDepartmentCode,IsActive,ActiveTillYear,StudyingStartyear,IsEmployee) ";
        command = prefix + sb.ToString();

        return command;
    }
    //---------------------------------------------------------------------------------
    // Create the SqlCommand
    //---------------------------------------------------------------------------------
    private SqlCommand CreateCommand(String CommandSTR, SqlConnection con)
    {

        SqlCommand cmd = new SqlCommand(); // create the command object

        cmd.Connection = con;              // assign the connection to the command object

        cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 

        cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

        cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

        return cmd;
    }
    public int PersonUpdate(Person person)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdatePersonCommand(person);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------
    // Build the Insert command String
    //--------------------------------------------------------------------
    private String BuildUpdatePersonCommand(Person person)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string


        command = @"UPDATE Person Set EmpFirstName=" + "'" + person.EmpFirstName + "'" + ", EmpLastName=" + "'" + person.EmpLastName + "'" + ", CellPhone=" + "'" + person.CellPhone + "'" + ", DepartmnetDepartmentCode=" + "'" + person.DepartmnetDepartmentCode + "', Email=" + "'" + person.Email + "'" +
            ", IsActive=" + "'" + person.IsActive + "'" + ", ActiveTillYear=" + "'" + person.ActiveTillYear + "'" + ", StudyingStartyear=" + "'" + person.StudyingStartyear + "'" + ", IsEmployee=" + "'" + person.IsEmployee + "'" + "where EmpCode=" + "'" + person.EmpCode + "'";

        


        return command;
    }
    //---------------------------------------------------------------------------------
    // Create the SqlCommand
    //---------------------------------------------------------------------------------
    //private SqlCommand CreateCommand(String CommandSTR, SqlConnection con)
    //{

    //    SqlCommand cmd = new SqlCommand(); // create the command object

    //    cmd.Connection = con;              // assign the connection to the command object

    //    cmd.CommandText = CommandSTR;      // can be Select, Insert, Update, Delete 

    //    cmd.CommandTimeout = 10;           // Time to wait for the execution' The default is 30 seconds

    //    cmd.CommandType = System.Data.CommandType.Text; // the type of the command, can also be stored procedure

    //    return cmd;
    //}
        public int PersonDelete(Person P)

    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeletePersonCommand(P);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildDeletePersonCommand(Person P)
    {
        String command;

        command = @"UPDATE Person Set Email = NULL WHERE Email = " + "'" + P.Email + "'";

        return command;
    }

    //--------------------------------------------------------------------------------------------------
    // These methods are to Task
    //--------------------------------------------------------------------------------------------------


    public List<Task> getTasks()
    {
        List<Task> personListt = new List<Task>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Task WHERE TaskName IS NOT NULL ";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Task t = new Task();

                t.TaskName = (string)dr["TaskName"];
                t.TaskNo = (int)dr["TaskNo"];
                t.Description = (string)dr["Description"];

                personListt.Add(t);
            }

            return personListt;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }




    }

    public int taskInsert(Task t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandTask(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandTask(Task t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}')", t.TaskName,t.Description);
        String prefix = "INSERT INTO Task " + "(TaskName, "+ "Description)";
        command = prefix + sb.ToString();

        return command;
    }
    public int DeleteTask(Task t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteCommandTask(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildDeleteCommandTask(Task t)
    {
        String command;

        command = @"UPDATE Task Set TaskName = NULL WHERE TaskName = " + "'" + t.TaskName + "'";

        return command;
    }
    public int UpdateTask(Task t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateTaskCommand(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------
    // Build the Insert command String
    //--------------------------------------------------------------------
    private String BuildUpdateTaskCommand(Task t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string



        command = @"UPDATE Task Set TaskName=" + "'" + t.TaskName + "'" + ", Description=" + "'" + t.Description + "'" + "where TaskNo=" + "'" + t.TaskNo + "'";
      


        return command;
    }

    //--------------------------------------------------------------------------------------------------
    //  These methods are to skills
    //--------------------------------------------------------------------------------------------------

    public List<skills> getskills()
    {
        List<skills> skillsList = new List<skills>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM skills WHERE SkillName IS NOT NULL";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                skills s = new skills();

                s.SkillName = (string)dr["SkillName"];


                skillsList.Add(s);
            }

            return skillsList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }




    }
    public int insertSkill(skills skill)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertSkillsCommand(skill);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertSkillsCommand(skills skill)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}')", skill.SkillName);
        String prefix = "INSERT INTO skills" + "(SkillName) ";
        command = prefix + sb.ToString();

        return command;
    }
    //--------------------------------------------------------------------------------------------------
    //  These methods are to EventType
    //--------------------------------------------------------------------------------------------------

    public List<Event_Type> GetEvent_Type()
    {
        List<Event_Type> Event_TypeList = new List<Event_Type>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "select * from [Event_Type] where EventName IS NOT NULL";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Event_Type Et = new Event_Type();

                // v.EmployeeEmpCode = (int)dr["EmployeeEmpCode"];
                Et.EventCode = (int)(dr["EventCode"]);
                Et.EventName = (string)(dr["EventName"]);


                Event_TypeList.Add(Et);
            }

            return Event_TypeList;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    public int Event_TypeInsert(Event_Type Et)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertEventsCommand(Et);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildInsertEventsCommand(Event_Type Et)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}')", Et.EventName);
        String prefix = "INSERT INTO [Event_Type] " + "(EventName) ";
        command = prefix + sb.ToString();
        //



        return command;
    }
    public int Event_TypeUpdate(Event_Type Et)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateEventTypeCommand(Et);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildUpdateEventTypeCommand(Event_Type Et)
    {
        String command;

        command = @"UPDATE Event_Type Set EventName = '" + Et.EventName + "' WHERE EventCode ='" + Et.EventCode + "'";

        return command;
    }

    public int DeleteEvent_Type(Event_Type t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteCommandEventType(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildDeleteCommandEventType(Event_Type t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string

        command = @"DELETE FROM Event_Type WHERE EventCode= '" + t.EventCode + "'";

        return command;
    }

    //--------------------------------------------------------------------------------------------------
    // These methods are to EquipmentType
    //--------------------------------------------------------------------------------------------------

    public List<EquipmentType> GetEquipmentType()
    {
        List<EquipmentType> ETlist = new List<EquipmentType>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM EquipmentType WHERE (Name IS NOT NULL) ";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                EquipmentType ET = new EquipmentType();
                ET.Code = (int)dr["Code"];
                ET.Name = (string)dr["Name"];
                ET.Quantity=(int)dr["Quantity"];
                ETlist.Add(ET);
            }

            return ETlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    public int InsertEqType(EquipmentType EqType)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertEqTypeCommand(EqType);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildInsertEqTypeCommand(EquipmentType EqType)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}',{1})", EqType.Name,EqType.Quantity);
        String prefix = "INSERT INTO EquipmentType" + "(Name,"+" Quantity) ";
        command = prefix + sb.ToString();

        return command;
    }

 
    public int EquipmentTypeDelete(EquipmentType Eq)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteEqTypeCommand(Eq);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildDeleteEqTypeCommand(EquipmentType Eq)
    {
        String command;

        command = @"UPDATE EquipmentType Set Name = NULL WHERE Name = " + "'" + Eq.Name + "'";

        return command;
    }


    public int UpdateEquipment(EquipmentType e)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateCommandEquipment(e);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildUpdateCommandEquipment(EquipmentType EqType)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string

        command = @"UPDATE EquipmentType Set Name=" + "'" + EqType.Name + "'" + ", Quantity= '" + EqType.Quantity + "' where Code= '" + EqType.Code +"'";

        return command;
    }
    //Event type Task..............................

    public List<Event_Type_Task> GetEvent_Type_Task()
    {
        List<Event_Type_Task> ETlist = new List<Event_Type_Task>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Event_Type_Task";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Event_Type_Task ET = new Event_Type_Task();
                ET.Event_TypeEventCode = (int)dr["Event_typeEventCode"];
                ET.TaskTaskNo = (int)dr["TaskTaskNo"];
                ETlist.Add(ET);
            }

            return ETlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    //insert
    public int taskInsertEventType(Event_Type_Task t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandTaskEventType(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandTaskEventType(Event_Type_Task t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}')", t.Event_TypeEventCode, t.TaskTaskNo);
        String prefix = "INSERT INTO Event_Type_Task " + "(Event_TypeEventCode, " + "TaskTaskNo)";
        command = prefix + sb.ToString();

        return command;
    }

    public int DeleteEvent_Type_Task(Event_Type_Task t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteCommandTaskEventType(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildDeleteCommandTaskEventType(Event_Type_Task t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string

        command = @"DELETE FROM Event_Type_Task WHERE TaskTaskNo= '"+ t.TaskTaskNo+"' and Event_TypeEventCode= '" + t.Event_TypeEventCode+"'";

        return command;
    }

    public List<Event_Type_EquipmentType> GetEvent_Type_EquipmentType()
    {
        List<Event_Type_EquipmentType> ETlist = new List<Event_Type_EquipmentType>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Event_Type_EquipmentType";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Event_Type_EquipmentType ET = new Event_Type_EquipmentType();
                ET.Event_TypeEventCode = (int)dr["Event_TypeEventCode"];
                ET.EquipmentTypeCode = (int)dr["EquipmentTypeCode"];
                ETlist.Add(ET);
            }

            return ETlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    //eventTypeEquipment   EquipmentInsertEventType
    public int EquipmentInsertEventType(Event_Type_EquipmentType t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandEquipmentEventType(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandEquipmentEventType(Event_Type_EquipmentType t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}')", t.Event_TypeEventCode, t.EquipmentTypeCode);
        String prefix = "INSERT INTO Event_Type_EquipmentType " + "(Event_TypeEventCode, " + "EquipmentTypeCode)";
        command = prefix + sb.ToString();

        return command;
    }

    public int DeleteEvent_Type_EquipmentType(Event_Type_EquipmentType et)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteCommandEventTypeEquipmentType(et);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildDeleteCommandEventTypeEquipmentType(Event_Type_EquipmentType et)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string

        command = @"DELETE FROM Event_Type_EquipmentType WHERE EquipmentTypeCode='" + et.EquipmentTypeCode + "' and Event_TypeEventCode='" + et.Event_TypeEventCode + "'";

        return command;
    }

    /////////////////////////////////Actual Event Insert
    ///

    //insert
    public int InsertActual_Task(Task_Person t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandActual_Task(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandActual_Task(Task_Person t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}', '{2}','{3}','{4}','{5}','{6}')" , t.TaskTaskNo,t.PersonEmpCode, t.exceutionDate, t.FromHour, t.ToHour,t.ReportedByPerson,t.ApprovedByManager);
        String prefix = "INSERT INTO Task_Person " + "(TaskTaskNo, " + "PersonEmpCode, "+ "exceutionDate, "+ " FromHour, "+ " ToHour, "+ " ReportedByPerson, "+ " ApprovedByManager )"; 
        command = prefix + sb.ToString();

    
     

        return command;
    }

    /////////////////////////////GET AFTUAL PERSON

    


    public List<Task_Person> GetTasks_Persons()
    {
        List<Task_Person> TPlist = new List<Task_Person>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Task_Person";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Task_Person TP = new Task_Person();
                TP.TaskTaskNo = (int)dr["TaskTaskNo"];
                TP.PersonEmpCode = (int)dr["PersonEmpCode"];
                TP.exceutionDate = (string)dr["exceutionDate"];
                TP.FromHour = (double)dr["FromHour"];
                TP.ToHour = (double)dr["ToHour"];
                TP.ReportedByPerson = (bool)dr["ReportedByPerson"];
                TP.ApprovedByManager = (bool)dr["ApprovedByManager"];
                TPlist.Add(TP);
            }

            return TPlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }
    //.......................................RoleCode....................................


    public List<Role_Employee> getRole_Employees()

    {
        List<Role_Employee> rlist = new List<Role_Employee>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Role_Employee";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Role_Employee ET = new Role_Employee();
                ET.RoleCode = (int)dr["RoleCode"];
                ET.EmployeeEmpCode = (int)dr["EmployeeEmpCode"];
                rlist.Add(ET);
            }

            return rlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }
    //post
    
            public int insertRole_Employees(Role_Employee t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandRole_Employee(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandRole_Employee(Role_Employee t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}')", t.RoleCode, t.EmployeeEmpCode);
        String prefix = "INSERT INTO Role_Employee " + "(RoleCode, " + "EmployeeEmpCode)";
        command = prefix + sb.ToString();




        return command;
    }
    //put
    
         public int Role_EmployeeUpdate(Role_Employee Et)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateRole_EmployeeCommand(Et);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildUpdateRole_EmployeeCommand(Role_Employee Et)
    {
        String command;

        command = @"UPDATE Role_Employee Set RoleCode = '" + Et.RoleCode + "' WHERE EmployeeEmpCode= '" + Et.EmployeeEmpCode + "'";

        return command;
    }


    public int Delete_Role_Employee(Role_Employee et)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteCommandRole_Employee(et);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildDeleteCommandRole_Employee(Role_Employee et)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string

        command = @"delete from Role_Employee where EmployeeEmpCode= '"+et.EmployeeEmpCode+"'";

        return command;
    }



    //////////////GET Role


    public List<Role> getRoles()
    {
        List<Role> Rlist = new List<Role>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Role";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Role R = new Role();
                R.RoleCode = (int)dr["RoleCode"];
                R.RoleName = (string)dr["RoleName"];
                R.description = (string)dr["description"];
                Rlist.Add(R);

            }

            return Rlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }


    /////////////Role Insert

    public int InsertRole(Role r)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandRole(r);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandRole(Role r)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}','{2}')", r.RoleCode, r.RoleName, r.description);
        String prefix = "INSERT INTO Role " + "(RoleCode, " + "RoleName, " + "description )";
        command = prefix + sb.ToString();





        return command;
    }



    ///////////////// PUT Role

    public int UpdateRole(Role role)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateRoleCommand(role);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)

        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    //--------------------------------------------------------------------
    // Build the Insert command String
    //--------------------------------------------------------------------
    private String BuildUpdateRoleCommand(Role role)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string


        command = @"UPDATE Role Set RoleName= '" + role.RoleName + "', description= " + "'" + role.description + "'" + " WHERE RoleCode= "+ "'" + role.RoleCode + "'";

        //command = @"UPDATE Task Set TaskName=" + "'" + t.TaskName + "'" + ", Description=" + "'" + t.Description + "'" + "where TaskNo=" + "'" + t.TaskNo + "'";


        return command;
    }

    ///////////ActualEvent//////////////////////////////////////////////////
 
    


          public List<Actual_Event> getActualEvent()
    {
        List<Actual_Event> Rlist = new List<Actual_Event>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Actual_Event";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                Actual_Event R = new Actual_Event();
                R.Barcode = (int)dr["Barcode"];
                R.date = (string)dr["date"];
                R.FromHour = (double)dr["FromHour"];
                R.ToHour = (double)dr["ToHour"];
                R.Event_TypeEventCode = (int)dr["Event_TypeEventCode"];
                R.Location = (string)dr["Location"];
                R.EmployeeEmpCode = (int)dr["EmployeeEmpCode"];
                Rlist.Add(R);

            }

            return Rlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }
    public int InsertActual_Event(Actual_Event t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandActual_Event(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandActual_Event(Actual_Event t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}', '{2}','{3}','{4}','{5}')", t.date, t.FromHour, t.ToHour, t.Event_TypeEventCode, t.Location, t.EmployeeEmpCode);
        String prefix = "INSERT INTO Actual_Event " + "(Date, " + "FromHour, " + "ToHour, " + " Event_TypeEventCode, " + " Location, " + " EmployeeEmpCode)";
        command = prefix + sb.ToString();




        return command;
    }


           public int DeleteActualEvent(int ActualEventId)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildDeleteCommandActualEvent(ActualEventId);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildDeleteCommandActualEvent(int ActualEventId)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string

        command = @"delete from Actual_Event where Barcode= '" + ActualEventId + "'";

        return command;
    }

    ///////////////////////////////////////EmpInfoRole///////////////////////

    public List<EmpInfoRoles> GetEmpInfoRoles()
    {
        List<EmpInfoRoles> Rlist = new List<EmpInfoRoles>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "select P.EmpCode,P.EmpFirstName,P.EmpLastName,P.cellPhone,P.Email,P.DepartmnetDepartmentCode,RO.RoleName from [dbo].[Person]  p inner join [dbo].[Role_Employee]  R on p.[EmpCode]=R.[EmployeeEmpCode]inner join[dbo].[Role] ro on ro.RoleCode=R.RoleCode";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                EmpInfoRoles R = new EmpInfoRoles();
                R.EmpCode= (int)dr["EmpCode"];
                R.EmpFirstName = (string)dr["EmpFirstName"];
                R.EmpLastName = (string)dr["EmpLastName"];
                R.cellPhone = (int)dr["cellPhone"];
                R.Email = (string)dr["Email"];
                R.DepartmnetDepartmentCode = (int)dr["DepartmnetDepartmentCode"];
                R.RoleName = (string)dr["RoleName"];
                Rlist.Add(R);

            }

            return Rlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }
    /////////////////////////////////////EquipmentActualEvent//////////////////////////////////////////
    public List<EquipmentType_Actual_Event> getEquipmentType_Actual_Events()

    {
        List<EquipmentType_Actual_Event> rlist = new List<EquipmentType_Actual_Event>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM EquipmentType_Actual_Event";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader
            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection); // CommandBehavior.CloseConnection: the connection will be closed after reading has reached the end

            while (dr.Read())
            {   // Read till the end of the data into a row
                EquipmentType_Actual_Event ET = new EquipmentType_Actual_Event();
                ET.EquipmentTypeCode = (int)dr["EquipmentTypeCode"];
                ET.Actual_EventBarcode = (int)dr["Actual_EventBarcode"];
                rlist.Add(ET);
            }

            return rlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }
    //post

    public int insertEquipmentType_Actual_Events(EquipmentType_Actual_Event t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandEquipmentType_Actual_Event(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandEquipmentType_Actual_Event(EquipmentType_Actual_Event t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}')", t.EquipmentTypeCode, t.Actual_EventBarcode);
        String prefix = "INSERT INTO EquipmentType_Actual_Event " + "(EquipmentTypeCode, " + "Actual_EventBarcode)";
        command = prefix + sb.ToString();




        return command;
    }
    //put

    public int DeleteEquipmentType_Actual_Events(EquipmentType_Actual_Event Et)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildUpdateEquipmentType_Actual_EventCommand(Et);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }

    private String BuildUpdateEquipmentType_Actual_EventCommand(EquipmentType_Actual_Event Et)
    {
        String command;

        command = @"DELETE EquipmentType_Actual_Event  WHERE Actual_EventBarcode= '" + Et.Actual_EventBarcode + "'";
        //DELETE FROM table_name WHERE condition;
        return command;
    }

    ////////PersonPlanTaskInEvent//////////////////////////////////////////////////////
    public List<Person_plan_TasksInEvent> GetPerson_plan_TasksInEvents()
    {
        List<Person_plan_TasksInEvent> TPlist = new List<Person_plan_TasksInEvent>();
        SqlConnection con = null;

        try
        {
            con = connect("ConnectionStringName"); // create a connection to the database using the connection String defined in the web config file

            String selectSTR = "SELECT * FROM Person_plan_TasksInEvent";
            SqlCommand cmd = new SqlCommand(selectSTR, con);

            // get a reader

            SqlDataReader dr = cmd.ExecuteReader(CommandBehavior.CloseConnection);
            while (dr.Read())
            {   // Read till the end of the data into a row
                Person_plan_TasksInEvent TP = new Person_plan_TasksInEvent();
                TP.PersonEmpCode = (int)dr["PersonEmpCode"];
                TP.plan_TasksInEventActual_EventBarcode = (int)dr["plan_TasksInEventActual_EventBarcode"];
                TP.plan_TasksInEventTaskTaskNo = (int)dr["plan_TasksInEventTaskTaskNo"];
                TP.FromHour = (double)dr["FromHour"];
                TP.ToHour = (double)dr["ToHour"];
                TP.executionDate = (string)dr["executionDate"];


                TPlist.Add(TP);
            }

            return TPlist;
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }
        finally
        {
            if (con != null)
            {
                con.Close();
            }

        }
    }

    public int Person_plan_TasksInEventInserts(Person_plan_TasksInEvent t)
    {

        SqlConnection con;
        SqlCommand cmd;

        try
        {
            con = connect("ConnectionStringName"); // create the connection
        }
        catch (Exception ex)
        {
            // write to log
            throw (ex);
        }

        String cStr = BuildInsertCommandPerson_plan_TasksInEvent(t);      // helper method to build the insert string

        cmd = CreateCommand(cStr, con);             // create the command

        try
        {
            int numEffected = cmd.ExecuteNonQuery(); // execute the command
            return numEffected;
        }
        catch (Exception ex)
        {
            return 0;
            // write to log
            throw (ex);
        }

        finally
        {
            if (con != null)
            {
                // close the db connection
                con.Close();
            }
        }

    }
    private String BuildInsertCommandPerson_plan_TasksInEvent(Person_plan_TasksInEvent t)
    {
        String command;

        StringBuilder sb = new StringBuilder();
        // use a string builder to create the dynamic string
        sb.AppendFormat("Values('{0}','{1}', '{2}','{3}','{4}','{5}')", t.PersonEmpCode, t.plan_TasksInEventActual_EventBarcode, t.plan_TasksInEventTaskTaskNo, t.FromHour, t.ToHour, t.executionDate);
        String prefix = "INSERT INTO Person_plan_TasksInEvent " + "(PersonEmpCode, " + "plan_TasksInEventActual_EventBarcode, " + "plan_TasksInEventTaskTaskNo, " + " FromHour, " + " ToHour, " + " executionDate)";
        command = prefix + sb.ToString();




        return command;
    }


}
