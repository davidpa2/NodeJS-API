import { Type } from "@sinclair/typebox";
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';
import Ajv from "ajv"; // Ajv library to manage validation

const LoginDTOSchema = Type.Object(
    {
        email: Type.String({
            format: 'email',
            errorMessage: {
                type: "El email debe ser un string",
                format: "El email debe ser un correo electrónico válido"
            }
        }),
        password: Type.String({
            errorMessage: {
                type: "La contraseña debe ser un string"
            }
        }),
    },
    {
        additionalProperties: false,
        errorMessage: {
            additionalProperties: "El formato del objeto no es válido"
        }
    }
);

const ajv = new Ajv({ allErrors: true });
addFormats(ajv, ["email"]).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);
const validate = ajv.compile(LoginDTOSchema);

const validateLoginDTO = (req, res, next) => {
    const isDTOValid = validate(req.body);

    if (!isDTOValid)
        return res
            .status(400)
            .send(ajv.errorsText(validate.errors, { separator: "\n" }));

    next();
};

export default validateLoginDTO;