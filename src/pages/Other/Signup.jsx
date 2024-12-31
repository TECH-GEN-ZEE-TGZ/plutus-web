import { useContext, useState } from "react";
import { StyledForm } from "../../components/Form/Form";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import AuthContext from "../../context/AuthContext";
import ContextVariables from "../../context/ContextVariables";

const Signup = () => {
  const { authInfo, seAuthInfo } = useContext(AuthContext);
  const { domain } = useContext(ContextVariables);

  const [verifyEmail, setVerifyEmail] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
    verification: "",
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEmailValidation = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password, confirmPassword, referralCode } = formData;
    const username = email.split("@")[0];

    // Input validation
    if (!email || !password || !confirmPassword || !referralCode) {
      setError("Please fill in all the fields.");
      return;
    }
    if (!handleEmailValidation(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    try {
      setLoading(true);
      // const response = await axios.post(
      //   `${domain}/`,
      //   { username, email, password, referralCode },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       "X-API-KEY": "your-api-key",
      //     },
      //   }
      // );
      // alert("Signup successful!");
      // console.log(response.data);
      setVerifyEmail(true);
    } catch (err) {
      // Handle error
      setError(
        err?.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password, referralCode, verification } = formData;
    const username = email?.split("@")[0];

    if (!email || !username || !password || !referralCode || !verification) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${domain}/`,
        { username, email, password, referralCode, verification },
        {
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": "your-api-key",
          },
        }
      );
      alert("Signup successful!");
      console.log(response.data);
    } catch (err) {
      // Handle error
      setError(
        err?.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledForm
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      onSubmit={verifyEmail ? handleVerifyEmail : handleSubmit}
    >
      {verifyEmail ? (
        <EmailV
          error={error}
          formData={formData}
          handleChange={handleChange}
          loading={loading}
          setAgree={setAgree}
          agree={agree}
        />
      ) : (
        <EmailNV
          error={error}
          formData={formData}
          handleChange={handleChange}
          loading={loading}
          setAgree={setAgree}
          agree={agree}
        />
      )}
    </StyledForm>
  );
};

export default Signup;

const EmailNV = ({
  error,
  formData,
  handleChange,
  loading,
  setAgree,
  agree,
}) => {
  return (
    <>
      <h3>Create an account.</h3>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, x: "10%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, y: "-10%" }}
            className="error"
          >
            <i class="bx bxs-error bx-tada"></i>
            {error}
            <i class="bx bxs-error bx-tada"></i>
          </motion.p>
        )}
      </AnimatePresence>

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData?.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData?.password}
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        value={formData?.confirmPassword}
        onChange={handleChange}
      />
      <input
        type="text"
        name="referralCode"
        placeholder="Enter Referral Code"
        value={formData?.referralCode}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? (
          <i className="bx bx-loader bx-spin"></i>
        ) : (
          <>
            Sign up <ion-icon name="arrow-forward"></ion-icon>
          </>
        )}
      </button>
      <div className="link">
        <button
          onClick={(e) => {
            e.preventDefault();
            setAgree(!agree);
          }}
        >
          {agree ? (
            <ion-icon name="checkbox"></ion-icon>
          ) : (
            <ion-icon name="square"></ion-icon>
          )}
        </button>
        <p>By signing up, you agree to our </p>
        <a href="#">Terms & Conditions</a>
      </div>
      <div className="switch">
        <p>Already a member?</p>
        <NavLink to={"/auth/login"}>Login</NavLink>
      </div>
    </>
  );
};
const EmailV = ({
  error,
  formData,
  handleChange,
  loading,
  setAgree,
  agree,
}) => {
  return (
    <>
      <h3>Verify your email.</h3>
      <p>
        Email has been sent to <span>{formData?.email}</span>
      </p>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, x: "10%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, y: "-10%" }}
            className="error"
          >
            <i class="bx bxs-error bx-tada"></i>
            {error}
            <i class="bx bxs-error bx-tada"></i>
          </motion.p>
        )}
      </AnimatePresence>
      <input
        type="text"
        name="verification"
        placeholder="Enter Code Sent To Your Email"
        value={formData?.veirfication}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? (
          <>
            <i className="bx bx-loader bx-spin"></i> Verifying...
          </>
        ) : (
          <>
            Verify <ion-icon name="arrow-forward"></ion-icon>
          </>
        )}
      </button>
    </>
  );
};

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (Congo-Brazzaville)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia (Czech Republic)",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  'Eswatini (fmr. "Swaziland")',
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Holy See",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar (formerly Burma)",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine State",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts & Nevis",
  "Saint Lucia",
  "Saint Vincent & Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome & Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

{
  /* <select name="country" value={formData.country} onChange={handleChange}>
        <option value="">Select Country</option>
        {countries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </select> */
}

{
  /* <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={formData.fullName}
        onChange={handleChange}
      /> */
}
