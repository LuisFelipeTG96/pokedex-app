-- CreateTable
CREATE TABLE "Pokemon" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "pokedexDescription" TEXT,
    "spriteUrl" TEXT,
    "artworkUrl" TEXT,
    "types" TEXT[],
    "generation" INTEGER NOT NULL,
    "evolutionLine" TEXT[],

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);
