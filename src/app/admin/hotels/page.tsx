"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Building2, Eye, Trash2, Star } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddHotelModal from "@/components/modal/hotel/AddHotelModal";
import EditHotelModal from "@/components/modal/hotel/EditHotelModal";
import { DUMMY_ADMIN_HOTEL_STATS, DUMMY_ADMIN_HOTELS } from "@/data/admin-hotel.data";

export default function AdminHotelsPage() {
  const [hotels, setHotels] = useState(DUMMY_ADMIN_HOTELS);

  return (
    <div className="space-y-8 max-w-full overflow-hidden p-2 md:p-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900">Hotel Management</h1>
        <p className="text-slate-500 text-sm">Add and manage hotel information shown in the patient app.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {DUMMY_ADMIN_HOTEL_STATS.map((stat, i) => (
          <div key={i} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm flex flex-col justify-between">
            <h2 className="text-3xl font-black text-[#00A3C4] mb-1">{stat.value}</h2>
            <div>
              <p className="text-slate-900 text-sm font-bold">{stat.title}</p>
              <p className="text-slate-500 text-xs mt-1">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <Input 
          placeholder="Search hotel, city, nearby hospital..." 
          className="max-w-md h-11 bg-white border-slate-200 focus-visible:ring-blue-500 rounded-xl"
        />
        <AddHotelModal />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Hotel List</h2>
          <p className="text-sm text-slate-500">These hotels appear in the user app hotel list and hotel details page.</p>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-slate-100 hover:bg-transparent">
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap py-3 px-6 text-[10px] uppercase tracking-widest">Hotel</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">City / Country</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Nearby Hospital</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Distance</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Price / Night</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Rating</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Amenities</TableHead>
                <TableHead className="font-semibold text-slate-500 whitespace-nowrap text-[10px] uppercase tracking-widest">Status</TableHead>
                <TableHead className="font-semibold text-slate-500 text-right whitespace-nowrap px-6 text-[10px] uppercase tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hotels.map((hotel) => (
                <TableRow key={hotel.id} className="border-slate-100 hover:bg-slate-50/50">
                  <TableCell className="py-4 px-6">
                    <div className="flex items-start gap-3">
                      <div className="h-8 w-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 mt-1">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 text-sm max-w-[150px] leading-tight block">
                          {hotel.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium block mt-1">{hotel.type}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    <div className="font-medium text-slate-900">{hotel.city},</div>
                    <div>{hotel.country}</div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm">
                    <div className="max-w-[100px] leading-tight">{hotel.nearbyHospital}</div>
                  </TableCell>
                  <TableCell className="text-slate-500 text-sm font-medium">{hotel.distance}</TableCell>
                  <TableCell className="text-slate-900 font-bold text-sm">{hotel.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-900 text-sm">{hotel.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 max-w-[120px]">
                      {hotel.amenities.map((amenity, i) => (
                        <Badge key={i} variant="secondary" className="bg-slate-100 text-slate-400 font-medium shadow-none w-fit text-[10px] whitespace-nowrap">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      hotel.status === 'Published' ? 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-none px-3 rounded-full' :
                      'bg-amber-50 text-amber-600 border-amber-200 shadow-none px-3 rounded-full'
                    }>
                      {hotel.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <EditHotelModal hotel={hotel} />
                      <Button variant="ghost" className={
                        hotel.status === 'Published' ? "h-8 px-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-bold" :
                        "h-8 px-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-bold"
                      }>
                        {hotel.status === 'Published' ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
