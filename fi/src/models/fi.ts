import mongoose from "mongoose";
import { FiStructured } from "./fi_Structured";

interface FiAttrs {
  user_id: string;
  consent_handle: string;
  consent_id?: string;
  fi_raw?: string;
  fi?: FiStructured;
}

interface FiModel extends mongoose.Model<FiDoc> {
  build(attrs: FiAttrs): FiDoc;
}

interface FiDoc extends mongoose.Document {
  user_id: string;
  consent_handle: string;
  consent_id: string;
  fi_raw: any;
  fi: FiStructured;
}

const fiSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    consent_handle: {
      type: String,
      required: true,
    },
    consent_id: {
      type: String,
    },
    fi_raw: { type: mongoose.Schema.Types.Mixed },
    fi: { type: mongoose.Schema.Types.Mixed },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.fi_raw;
      },
    },
  }
);

fiSchema.statics.build = (attrs: FiAttrs) => {
  return new FI(attrs);
};
const FI = mongoose.model<FiDoc, FiModel>("FI", fiSchema);

export { FI };
