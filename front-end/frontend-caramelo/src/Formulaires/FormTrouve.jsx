import { useForm, Controller } from "react-hook-form";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import axios from "axios";
import dayjs from "dayjs";

import "dayjs/locale/fr";
import "./Styles.css";
dayjs.locale("fr"); 
const FormPerdu = () => {
    const {
        register,
        handleSubmit,
        setValue,
        control,
        watch,
        formState: { errors, isSubmitting },
    } = useForm();

const vet = watch("Vet");

const onSubmit = async (data) => {
    const { Photo, ...resto } = data;
    const dataFormate = {
        ...resto,
        Date_time: data.Date_time.format("DD/MM/YYYY HH:mm"),
    };
    try {
        await axios.post("http://localhost:3000/pets", dataFormate);
        console.log("Envoie confirme");
    } catch (error) {
        console.error("Erreur:", error.response?.data);
    }
};

    const handleGPS = () => {
        if (!navigator.geolocation) {
            alert("La géolocalisation n'est pas supportée par votre navigateur.");
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const coords = `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;
                setValue("GPS_coordinates", coords, { shouldValidate: true });
            },
            (err) => {
                if (err.code === 1) {
                    alert("Accès à la localisation refusé. Veuillez l'autoriser dans les paramètres de votre navigateur.");
                } else {
                    alert("Impossible d'obtenir votre position. Vérifiez que la localisation est activée.");
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };






    return (
        <LocalizationProvider  dateAdapter={AdapterDayjs} 
    adapterLocale="fr"
    localeText={{
        fieldDayPlaceholder: () => "JJ",
        fieldMonthPlaceholder: () => "MM",
        fieldYearPlaceholder: () => "AAAA",
        fieldHoursPlaceholder: () => "HH",
        fieldMinutesPlaceholder: () => "mm",
    }}>
            <section className="perdu-container">
                <form className="perdu-form" onSubmit={handleSubmit(onSubmit)} noValidate>

                    <h3>J'AI TROUVÉ UNE PET 🐾</h3>


                    {/*Pour la pulse et Alert du veterinaire*/}
                    <div className="radio-block">
                        <span className="radio-label">Visite vétérinaire</span>
                        <div className="radio-group" >
                            <label><input type="radio" value="oui" {...register("Vet")} /> Oui</label>
                            <label><input type="radio" value="non" {...register("Vet")} /> Non</label>
                        </div>
                         {vet === "non" && (
                        <p className="info-message">Nous vous suggérons d'emmener l'animal chez le véterinaire le plus proche afin de vérifier sa puce électronique (c'est gratuit)</p>
                          )}
                    </div>
                       {/*Numero de la pulse do chien */}
                       <div className="floating-label">
                    <input
                        type="text"
                        placeholder=""
                        {...register("Chip_number")}
                    />
                    <label>Numéro de puce (Facultatif)</label>
                     </div>
                    
                    {/*Nom de l'animal */}
                    <div className="floating-label">
                            <input
                                type="text"
                                placeholder=" "
                                className={errors.Name ? "input-error" : ""}
                                {...register("Name")}
                            />
                            <label>Nom (Facultatif)</label>
                        </div>
                    {errors.Name && <p className="error-message">{errors.Name.message}</p>}
    
                        {/*L'age de l'animal */}
                    <div className="floating-label">
                    <input                    
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder=" "
                        className={errors.Age ? "input-error" : ""}
                        {...register("Age", {
                            pattern: { value: /^[0-9]*$/, message: "Entrez un nombre valide" },
                        })}
                    />
                       <label>Âge approximatif ex: 3 ans (Facultatif)</label>
                        </div>
                    {errors.Age && <p className="error-message">{errors.Age.message}</p>}

                     

                     {/*Selecteur de espèces */}   
                        <p></p>                      
                    <select
                        className={errors.Species ? "input-error" : ""}
                        {...register("Species", { required: "Veuillez choisir une espèce" })}
                    >
                        <option value="">Espèce </option>
                        <option value="chien">Chien</option>
                        <option value="chat">Chat</option>
                        <option value="equides">Équidés</option>
                    </select>
                    {errors.Species && <p className="error-message">{errors.Species.message}</p>}
                        <p></p>
                     <div className="floating-label">
                    <input
                        type="text"
                        placeholder=" "
                        {...register("Race")}
                    />     
                    <label>Race — ex : Labrador, Berger allemand… (Facultatif)</label>
                    </div>

                    {/* Date et Heure  */}
                    <div className="datetime-block">
                        <Controller
                            name="Date_time"
                            control={control}
                            rules={{ required: "La date et l'heure sont obligatoires" }}
                            render={({ field }) => (
                               <DateTimePicker
                                    label="Date et heure de découverte"
                                    value={field.value ?? null}
                                    onChange={(val) => field.onChange(val)}
                                    defaultValue={dayjs()}
                                    format="DD/MM/YYYY HH:mm"
                                    viewRenderers={{
                                        hours: renderTimeViewClock,
                                        minutes: renderTimeViewClock,
                                        seconds: renderTimeViewClock,
                                    }}
                                    slotProps={{
                                        textField: {
                                            className: errors.Date_time ? "input-error" : "",
                                        },
                                    }}
                               />
                            )}
                        />
                        {errors.Date_time && (
                            <p className="error-message">{errors.Date_time.message}</p>
                        )}
                    </div>

                        {/*Button ma position, plus place pour ecrire la ville ou vous avez perdu le pet */}
                    <div className="lieu-block">
                        <label className="field-label">Lieu de découverte </label>
                        <input
                            type="text"
                            placeholder="Adresse ou nom de ville"
                            className={errors.GPS_coordinates ? "input-error" : ""}
                            {...register("GPS_coordinates", { required: "Indiquez un lieu" })}
                        />
                        {errors.GPS_coordinates && <p className="error-message">{errors.GPS_coordinates.message}</p>}
                        <button type="button" className="btn-gps" onClick={handleGPS}>
                            📍 Ma position actuelle
                        </button>
                    </div>

                        {/*Pour recuperer la photo chez la galerie */}
                    <div className="datetime-block">
                        <label className="field-label">Photo de l'animal</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="input-file"
                            {...register("Photo")}
                        />
                    </div>

                        {/*Text area pour decrire l'animal perdu */}
                    <textarea
                        rows={3}
                        placeholder="Description — ex : collier bleu, tache blanche sur le dos…"
                        {...register("Description")}
                    />

                        {/*Button pour signaliser le animal perdu */}
                    <button type="submit" className="btn-submit" disabled={isSubmitting}>
                        {isSubmitting ? "Envoi en cours..." : "Signaler un animal trouvé"}
                    </button>

                </form>
            </section>
        </LocalizationProvider>
    );
};

export default FormPerdu;